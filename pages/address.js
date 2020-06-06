import Link from 'next/link';
import Layout from '../components/Layout';
import Address from '../components/Address';

export default () => (
    <Layout header="アドレス登録張" title="アドレス帳">
        <Address />
        <hr />
        <div className="linkbox">
            <Link href="/address_add">
                <button className="btn pageBtn">連作先を追加</button>
            </Link>
        </div>
    </Layout>
);