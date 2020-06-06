import Link from 'next/link';
import Layout from '../components/Layout';
import AddressAdd from '../components/AddressAdd';

export default () => (
    <Layout header="連絡先を追加" title="連絡先を追加">
        <AddressAdd />
        <hr />
        <div className="linkbox">
            <Link href="/address">
                <button className="btn pageBtn">トップページに戻る</button>
            </Link>
        </div>
    </Layout>
);