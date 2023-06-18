import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { publicRequest } from "../requestMethods";
import { AiOutlineFilter, AiOutlineSearch } from "react-icons/ai";

const Panel = () => {
  const [orders, setOrders] = useState([]);
  const [totalVerifiedOrders, setTotalVerifiedOrders] = useState({
    title: "Total sales",
  });
  const [totalPendingOrders, setTotalPendingOrders] = useState({
    title: "Pending Orders",
  });
  const [totalIncome, setTotalIncome] = useState({
    title: "Revenue generated",
    devise: "$",
  });

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await publicRequest.get(`orders`);
        setOrders(res.data);
        let verifiedCount = 0;
        let pendingCount = 0;
        let verifiedPriceSum = 0;

        for (const order of res.data) {
          if (order.status === "Verified") {
            verifiedCount++;
            verifiedPriceSum += order.price;
          } else if (order.status === "Pending") {
            pendingCount++;
          }
        }
        setTotalVerifiedOrders({
          ...totalVerifiedOrders,
          count: verifiedCount,
        });
        setTotalPendingOrders({ ...totalPendingOrders, count: pendingCount });
        setTotalIncome({ ...totalIncome, count: verifiedPriceSum });
      } catch (err) {}
    };
    getOrders();
  }, [totalVerifiedOrders, totalIncome, totalPendingOrders]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const [filterName, setFilterName] = useState("");

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders
    ?.filter((item) =>
      item.name.toLowerCase().includes(filterName.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(orders.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li
        key={number}
        className={currentPage === number ? "active" : ""}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </li>
    );
  });

  return (
    <div className="panel_container">
      <h4>In the last 30 days.</h4>
      <div className="grid3_admin">
        <Card data={totalVerifiedOrders} />
        <Card data={totalPendingOrders} />
        <Card data={totalIncome} />
      </div>
      <h4>All orders</h4>
      <div className="header_panel">
        <p>Monitor sales and status</p>
        <div>
          <div className="group item">
            <AiOutlineSearch className="icon" />
            <input placeholder="Search product"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)} type="search" className="input" />
          </div>
          <button className="item">
            <AiOutlineFilter className="icon" /> Filter
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Unity Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.phone}</td>
              <td>
                <span className={`${item.status} status`}>{item.status}</span>
              </td>
              <td>$ {item.price / item.quantity}</td>
              <td>{item.quantity}</td>
              <td>$ {item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button>Previous page</button>
        <ul id="page-numbers">{renderPageNumbers}</ul>
        <button>Next page</button>
      </div>
    </div>
  );
};

export default Panel;
