import { makeServerSideProps } from '@/lib/getStatic';
import LandingPage from '@/modules/LandingPage';

export default LandingPage;

const getServerSideProps = makeServerSideProps();
export { getServerSideProps };
