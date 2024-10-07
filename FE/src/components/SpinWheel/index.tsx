import { type HTMLAttributes, useEffect, useRef, useState } from 'react';

import { sleep } from '@/lib/common';
import { cn } from '@/lib/utils';
import { useAccount } from 'wagmi';
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
  const finished = useRef<boolean>(false);
  const currentSegment = useRef<string>('');

  const timerDelay = segmentTextArray.length;
  let canvasContext: any = null;
  let maxSpeed = Math.PI / segmentTextArray.length;
  const upTime = segmentTextArray.length * upDuration;
  const downTime = segmentTextArray.length * downDuration;
  let spinStart = 0;
  // eslint-disable-next-line unused-imports/no-unused-vars
  let frames = 0;
  const centerX = size;
  const centerY = size;

  useEffect(() => {
    wheelInit();
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const wheelInit = () => {
    initCanvas();
    wheelDraw();
  };

  const initCanvas = () => {
    let canvas: HTMLCanvasElement | null = document.getElementById('canvas') as HTMLCanvasElement;

    if (!canvas) {
      // Create a new canvas if it doesn't exist
      canvas = document.createElement('canvas');
      canvas.setAttribute('width', `${size * 2}`);
      canvas.setAttribute('height', `${size * 2}`);
      canvas.setAttribute('id', 'canvas');
      document?.getElementById('wheel')?.appendChild(canvas);
    }
    canvasContext = canvas.getContext('2d');

    canvas.style.borderRadius = '50%';

    canvas?.addEventListener('click', spin, false);
  };

  const spin = () => {
    if (!isConnected) {
      setTargetInView('connectWallet');
      return;
    }

    if (timerHandle.current === 0) {
      spinStart = new Date().getTime();
      maxSpeed = Math.PI / segmentTextArray.length;
      frames = 0;
      timerHandle.current = setInterval(onTimerTick, timerDelay * 5);
    }
  };

  const onTimerTick = async () => {
    frames++;
    wheelDraw();
    const duration = new Date().getTime() - spinStart;
    progress.current = 0;
    finished.current = false;

    if (duration < upTime) {
      await sleep(0);
      progress.current = duration / upTime;
      angleDelta.current = maxSpeed * Math.sin((progress.current * Math.PI) / 2);
    } else {
      await sleep(0);
      progress.current = duration / downTime;
      angleDelta.current = maxSpeed * Math.sin((progress.current * Math.PI) / 2 + Math.PI / 2);
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
  };

  const wheelDraw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const drawSegment = (key: number, lastAngle: number, angle: number) => {
    const ctx = canvasContext;
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
  };

  const drawWheel = () => {
    const ctx = canvasContext;
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
  };

  const drawNeedle = () => {
    const ctx = canvasContext;
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
  };

  const clear = () => {
    const ctx = canvasContext;
    ctx.clearRect(0, 0, size, size);
  };

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
