import { type HTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import { useAccount } from 'wagmi';

import { sleep } from '@/lib/common';
import { cn } from '@/lib/utils';
import { useIntersectionStore } from '@/stores';

export interface ISpinWheelProps extends HTMLAttributes<HTMLCanvasElement> {
  segments: ISegments[];
  onFinished: (result: string) => void;
  primaryColor?: string;
  contrastColor?: string;
  buttonText?: string;
  isOnlyOnce?: boolean;
  size?: number;
  upDuration?: number;
  downDuration?: number;
  fontFamily?: string;
  arrowLocation?: 'center' | 'top';
}

export interface ISegments {
  segmentText: string;
  segColor?: string;
}

const SpinWheel: React.FC<ISpinWheelProps> = ({
  segments,
  onFinished,
  primaryColor = 'black',
  contrastColor = 'white',
  buttonText = 'Spin',
  isOnlyOnce = false,
  size = 290,
  upDuration = 100,
  downDuration = 600,
  fontFamily = 'Arial',
  arrowLocation = 'center',
  className,
}: ISpinWheelProps) => {
  const setTargetInView = useIntersectionStore.use.setTargetInView();
  const { isConnected } = useAccount();

  const segmentTextArray = segments?.map((segment) => segment?.segmentText).filter(Boolean);
  const segColorArray = segments?.map((segment) => segment?.segColor).filter(Boolean);

  const [isFinished, setFinished] = useState<boolean>(false);

  const timerHandle = useRef<any>(0);
  const angleCurrent = useRef<number>(0);
  const angleDelta = useRef<number>(0);
  const progress = useRef<number>(0);
  const spinStart = useRef<number>(0);
  const maxSpeed = useRef<number>(Math.PI / segmentTextArray.length);
  const frames = useRef<number>(0);
  const canvasContext = useRef<any>(null);
  const finished = useRef<boolean>(false);
  const currentSegment = useRef<string>('');

  const timerDelay = segmentTextArray.length;
  const upTime = segmentTextArray.length * upDuration;
  const downTime = segmentTextArray.length * downDuration;
  const centerX = size;
  const centerY = size;

  const drawSegment = useCallback(
    (key: number, lastAngle: number, angle: number) => {
      const ctx = canvasContext.current;
      const value = segmentTextArray[key];
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, size, lastAngle, angle, false);
      ctx.lineTo(centerX, centerY);
      ctx.closePath();
      ctx.fillStyle = segColorArray[key];
      ctx.fill();
      ctx.stroke();
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((lastAngle + angle) / 2);
      ctx.fillStyle = contrastColor;
      ctx.font = `bold 1.5em ${fontFamily}`;
      ctx.fillText(value.substring(0, 21), size / 2 + 20, 0);
      ctx.restore();
    },
    [centerX, centerY, contrastColor, fontFamily, segColorArray, segmentTextArray, size]
  );

  const drawWheel = useCallback(() => {
    const ctx = canvasContext.current;
    let lastAngle = angleCurrent.current;
    const len = segmentTextArray.length;
    const PI2 = Math.PI * 2;
    ctx.lineWidth = 1;
    ctx.strokeStyle = primaryColor;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = `bold 1.5em ${fontFamily}`;
    for (let i = 1; i <= len; i++) {
      const angle = PI2 * (i / len) + angleCurrent.current;
      drawSegment(i - 1, lastAngle, angle);
      lastAngle = angle;
    }

    // Draw a center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, PI2, false);
    ctx.closePath();
    ctx.fillStyle = primaryColor;
    ctx.lineWidth = 2;
    ctx.strokeStyle = contrastColor;
    ctx.fill();
    ctx.font = `bold 1em ${fontFamily}`;
    ctx.fillStyle = contrastColor;
    ctx.textAlign = 'center';
    ctx.fillText(buttonText, centerX, centerY + 3);
    ctx.stroke();

    // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, size, 0, PI2, false);
    ctx.closePath();

    ctx.lineWidth = 4;
    ctx.strokeStyle = primaryColor;
    ctx.stroke();
  }, [
    buttonText,
    centerX,
    centerY,
    contrastColor,
    drawSegment,
    fontFamily,
    primaryColor,
    segmentTextArray.length,
    size,
  ]);

  const drawNeedle = useCallback(() => {
    const ctx = canvasContext.current;
    ctx.lineWidth = 1;
    ctx.strokeStyle = contrastColor;
    ctx.fileStyle = contrastColor;
    ctx.beginPath();

    if (arrowLocation === 'top') {
      ctx.moveTo(centerX + 20, centerY / 15);
      ctx.lineTo(centerX - 20, centerY / 15);
      ctx.lineTo(centerX, centerY - centerY / 1.35);
    } else {
      ctx.moveTo(centerX + 20, centerY - 30);
      ctx.lineTo(centerX - 20, centerY - 30);
      ctx.lineTo(centerX, centerY - centerY / 2.5);
    }

    ctx.closePath();
    ctx.fill();
    const change = angleCurrent.current + Math.PI / 2;
    let i = segmentTextArray.length - Math.floor((change / (Math.PI * 2)) * segmentTextArray.length) - 1;
    if (i < 0) i += segmentTextArray.length;
    else if (i >= segmentTextArray.length) i -= segmentTextArray.length;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = primaryColor;
    ctx.font = `bold 2em ${fontFamily}`;
    currentSegment.current = segmentTextArray[i];
  }, [arrowLocation, centerX, centerY, contrastColor, fontFamily, primaryColor, segmentTextArray]);

  const clear = useCallback(() => {
    const ctx = canvasContext.current;
    ctx.clearRect(0, 0, size, size);
  }, [size]);

  const wheelDraw = useCallback(() => {
    clear();
    drawWheel();
    drawNeedle();
  }, [clear, drawNeedle, drawWheel]);

  const onTimerTick = useCallback(async () => {
    frames.current++;
    wheelDraw();
    const duration = new Date().getTime() - spinStart.current;
    progress.current = 0;
    finished.current = false;

    if (duration < upTime) {
      await sleep(0);
      progress.current = duration / upTime;
      angleDelta.current = maxSpeed.current * Math.sin((progress.current * Math.PI) / 2);
    } else {
      await sleep(0);
      progress.current = duration / downTime;
      angleDelta.current = maxSpeed.current * Math.sin((progress.current * Math.PI) / 2 + Math.PI / 2);
      if (progress.current >= 1) finished.current = true;
    }
    await sleep(0);

    angleCurrent.current += angleDelta.current;
    while (angleCurrent.current >= Math.PI * 2) angleCurrent.current -= Math.PI * 2;
    if (finished.current) {
      setFinished(true);
      onFinished(currentSegment.current);
      clearInterval(timerHandle.current);
      timerHandle.current = 0;
      angleDelta.current = 0;
    }
  }, [downTime, onFinished, upTime, wheelDraw]);

  const spin = useCallback(() => {
    if (!isConnected) {
      setTargetInView('connectWallet');
      return;
    }

    if (timerHandle.current === 0) {
      spinStart.current = new Date().getTime();
      maxSpeed.current = Math.PI / segmentTextArray.length;
      frames.current = 0;
      timerHandle.current = setInterval(onTimerTick, timerDelay * 5);
    }
  }, [isConnected, onTimerTick, segmentTextArray.length, setTargetInView, timerDelay]);

  const initCanvas = useCallback(() => {
    let canvas: HTMLCanvasElement | null = document.getElementById('canvas') as HTMLCanvasElement;

    if (!canvas) {
      // Create a new canvas if it doesn't exist
      canvas = document.createElement('canvas');
      canvas.setAttribute('width', `${size * 2}`);
      canvas.setAttribute('height', `${size * 2}`);
      canvas.setAttribute('id', 'canvas');
      document?.getElementById('wheel')?.appendChild(canvas);
    }
    canvasContext.current = canvas.getContext('2d');

    canvas.style.borderRadius = '50%';

    canvas?.addEventListener('click', spin, false);
  }, [size, spin]);

  const wheelInit = useCallback(() => {
    initCanvas();
    wheelDraw();
  }, [initCanvas, wheelDraw]);

  useEffect(() => {
    wheelInit();
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 0);
  }, [wheelInit]);

  return (
    <div id="wheel" className="p-6">
      <canvas
        id="canvas"
        width={size * 2}
        height={size * 2}
        className={cn(
          {
            'pointer-events-none': isFinished && isOnlyOnce,
          },
          className
        )}
      />
    </div>
  );
};

export default SpinWheel;
