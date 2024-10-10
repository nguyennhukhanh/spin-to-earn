import { AuthLayout } from '@/components/layouts/AuthLayout';
import { makeServerSideProps } from '@/lib/getStatic';
import ClaimPage from '@/modules/ClaimPage';

const Page = () => (
  <AuthLayout>
    <ClaimPage />
  </AuthLayout>
);

export default Page;

const getServerSideProps = makeServerSideProps();
export { getServerSideProps };
