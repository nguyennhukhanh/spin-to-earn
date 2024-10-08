import { makeServerSideProps } from '@/lib/getStatic';
import ClaimPage from '@/modules/ClaimPage';

export default ClaimPage;

const getServerSideProps = makeServerSideProps();
export { getServerSideProps };
