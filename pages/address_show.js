import Link from 'next/link';
import Layout from '../components/Layout';
import AddressShow from '../components/AddressShow';

export default () => (
    <Layout header="詳細ページ" title="詳細ページ">
        <AddressShow />
        <hr />
        <div class="linkbox">
            <Link href="/address">
                <button className="btn pageBtn">戻る</button>
            </Link>
        </div>
    </Layout>
);