import { useMemo } from "react";
import moment from "moment";

const Invoice = ({ data }) => {

  
  const orderDetail = data?.data;
  const { header } = orderDetail || {}

  const { customer, employee } = header || {};
  const { products, shippingPrice, shippingDiscount } = orderDetail?.deliveries?.[0] || {};
  const { fullAddress , code: deliveryCode } = orderDetail?.deliveries?.[0]?.store || {};

  const totalProduct = useMemo(() => {
    return Math.round(
      products?.reduce(
        (previousValue, currentValue) => previousValue + currentValue.quantity,
        0
      )
    );
  }, [products]);

  const totalPrice = useMemo(() => {
    return products?.reduce(
      (previousValue, currentValue) =>
        previousValue + Number(currentValue.sellPrice || 0) * Number(currentValue.quantity || 0),
      0
    );
  }, [products]);

  const shippingPriceTotal =
    useMemo(() => {
      return orderDetail?.deliveries?.reduce(
        (previousValue, currentValue) =>
          previousValue + Number(currentValue.shippingPrice),
        0
      );
    }, [orderDetail?.deliveries]) || 0;
  const shippingDiscountTotal =
    useMemo(() => {
      return orderDetail?.deliveries?.reduce(
        (previousValue, currentValue) =>
          previousValue + Number(currentValue.shippingDiscount),
        0
      );
  }, [orderDetail?.deliveries]) || 0;

  const amountCaculator = useMemo(() => {
    return Number(totalPrice) + Number(shippingPrice || 0) - Number(shippingDiscount);
  }, [shippingDiscount, shippingPrice, totalPrice]);

  const saveMoney = totalPrice - shippingDiscountTotal;

  // if (isLoading) return <Loading />;

  if (orderDetail?.error)
    return (
      <div style={{
        textAlign: "center",
        marginTop: "50px"
      }}>
        <div>{orderDetail?.error}</div>
      </div>
    );

  return (
    <div
      style={{
        fontFamily: 'Lato, sans-serif',
        fontSize: '16px',
        lineHeight: '25px', 
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '25px 0px',
        }}
        id="invoice-wp"
      >
        <div id="invoice" style={{ padding: '15px', width: '452px', border: '1px solid #dfdfdf' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                <img src="https://i.postimg.cc/SxLxqbFw/logo-kfm.png" />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <span style={{ width: '85%', marginBottom: '10px', textAlign: 'center' }}>
                  CH: Kingfoodmart - {fullAddress}
                </span>
                <span>
                  Mã cửa hàng: {deliveryCode} · Mã NV: {employee?.employeeId || '--'}
                </span>
              </div>
              <div
                style={{ border: '1px dashed #000000', margin: '15px 0px', width: '100%' }}
              ></div>
              <h1 style={{ fontSize: '25px', fontWeight: 'bold', marginBottom: '12px' }}>
                HOÁ ĐƠN BÁN HÀNG
              </h1>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span>
                Thời gian: {moment(orderDetail?.header?.orderTime).format('HH:mm DD/MM/YYYY')}
              </span>
              <span>Số HD: {orderDetail?.header?.code}</span>
              <span>Khách hàng: {customer?.name}</span>
              <span>
                SDT: ******
                {customer?.phone
                  ?.toString()
                  .slice(customer?.phone?.length - 4, customer?.phone?.length)}
              </span>
              <div style={{ margin: '15px 0px' }}></div>
              <div
                style={{ border: '1px dashed #000000', margin: '15px 0px', width: '100%' }}
              ></div>
              <div
                style={{
                  display: 'flex',
                  margin: '10px 0px',
                  marginTop: '10px',
                }}
              >
                <div style={{ width: '50%', fontWeight: 'bold', textAlign: 'left' }}>Đơn giá</div>
                <div style={{ width: '25%', fontWeight: 'bold' }}>SL</div>
                <div style={{ width: '25%', fontWeight: 'bold', textAlign: 'right' }}>
                  Thành tiền
                </div>
              </div>
              {products?.map((product, index) => {
                const { originPrice, sellPrice } = product || {};
                const discount = Math.floor(
                  ((Number(originPrice) - Number(sellPrice)) / Number(originPrice)) * 100
                );
                return (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      margin: '10px 0',
                    }}
                  >
                    <div style={{ width: '100%' }}>
                      {product?.name} {product.unit && `(${product?.unit})`}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                      }}
                    >
                      <div style={{ width: '50%' }}>
                        {sellPrice === originPrice && (
                          <span>{new Intl.NumberFormat().format(originPrice) || 0}</span>
                        )}
                        {sellPrice !== originPrice && (
                          <>
                            <span
                              style={{
                                textDecoration: 'line-through',
                                marginRight: '10px',
                              }}
                            >
                              {new Intl.NumberFormat().format(originPrice) || 0}
                            </span>
                            <span>{new Intl.NumberFormat().format(sellPrice) || 0}</span>
                            {Boolean(discount) && (
                              <span
                                style={{
                                  marginLeft: '10px',
                                }}
                              >
                                (-{discount}%)
                              </span>
                            )}
                          </>
                        )}
                      </div>
                      <div style={{ width: '25%' }}>{product?.quantity}</div>
                      <div style={{ width: '25%', textAlign: 'right' }}>
                        <span>
                          {' '}
                          {new Intl.NumberFormat().format(
                            Number(sellPrice || 0) * Number(product.quantity || 0)
                          ) || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ border: '1px dashed #000000', margin: '15px 0px', width: '100%' }}></div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>Tổng số lượng:</span>
                <span>{totalProduct}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>Tổng tiền hàng:</span>
                <span>{new Intl.NumberFormat().format(totalPrice) || 0}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>Phí vận chuyển:</span>
                <span>{new Intl.NumberFormat().format(shippingPriceTotal) || 0}</span>
              </div>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>Giảm phí vận chuyển:</span>
                <span>
                  {Boolean(shippingDiscountTotal) && '-'}
                  {new Intl.NumberFormat().format(shippingDiscountTotal) || 0}
                </span>
              </div>
            </div>
            <div style={{ border: '1px dashed #000000', margin: '15px 0px', width: '100%' }}></div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                }}
              >
                <span>Tộng cộng:</span>
                <div className="flex flex-col">
                  {Number(saveMoney) !== Number(totalPrice) && Boolean(saveMoney) && (
                    <small>Tiết kiệm {new Intl.NumberFormat().format(saveMoney) || 0}</small>
                  )}
                  <span>{new Intl.NumberFormat().format(amountCaculator) || 0}</span>
                </div>
              </div>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>Tiền khách đưa:</span>
                <span>--</span>
              </div>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ textAlign: 'right' }}>
                  <span>Thanh toán bằng điểm (VNĐ):</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span>--</span>
                </div>
              </div>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ textAlign: 'right' }}>
                  <span>Tổng điểm còn lại:</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span>--</span>
                </div>
              </div>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ textAlign: 'right' }}>
                  <span>Tiền còn trong thẻ:</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span>--</span>
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                marginTop: '20px',
              }}
            >
              <div style={{ width: '55%' }}>
                <div style={{ border: '1px dashed #000000', margin: '15px 0px' }}></div>
                <div style={{ border: '1px dashed #000000', margin: '15px 0px' }}></div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  margin: '18px 0px',
                }}
              >
                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>YÊU CẦU HỖ TRỢ</span>
                <span>
                  <span>Liên hệ </span>
                  <strong>1800 6804</strong>
                </span>
                <span>
                  (<strong>7:00 - 21:00</strong> · Trừ CN và ngày lễ)
                </span>
              </div>
              <div style={{ width: '55%' }}>
                <div style={{ border: '1px dashed #000000', margin: '15px 0px' }}></div>
                <div style={{ border: '1px dashed #000000', margin: '15px 0px' }}></div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                gap: 5,
                marginTop: '15px',
                flexDirection: 'column',
              }}
            >
              <span style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
                Tải ứng dụng OneLife để sử dụng thẻ ngay hôm nay
              </span>
              <span style={{ textAlign: 'center' }}>
                Dùng Thẻ OneLife - Kingfoodmart để hưởng <strong>Freeship</strong> và{' '}
                <strong>nhận thêm giá trị Thẻ nạp</strong>
              </span>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10px',
            }}
          >
            <img src="https://i.postimg.cc/yD6Mzwh4/qr.jpg" width="158" height="158" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Invoice;