
import Invoice from '@/components/Invoice';

export async function getServerSideProps(context) {
  // Fetch data from external API
  const { query } = context;
  const { code } = query;

  const res = await fetch(`https://oms-api-dev.seedcom.me/share/getOrderDetail?companyKey=uifTjoY24DRGWz3NjcVa7w&orderCode=${code}`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

const InvoicePage = ({ data }) => {
  return (
    <Invoice data={data} />
  )
};

export default InvoicePage;

