import axios from "axios";
import React, { useEffect, useState } from "react";

const Order = () => {
  const [order, setorder] = useState([]);
  useEffect(() => {
    axios
      .get("https://my-json-server.typicode.com/dsrishi/orders/orders")
      .then((res) => {
        console.log(res.data);
        setorder(res.data);
      });
  }, []);

  //get all branch
  let branchArray = [];
  for (let i = 0; i < order.length; i++) {
    branchArray.push(order[i].branch);
  }
  const branch = [...new Set(branchArray)];

  //get all service
  let serviceArray = [];
  for (let i = 0; i < order.length; i++) {
    serviceArray.push(order[i].service);
  }
  const service = [...new Set(serviceArray)];

  //filters
  const handleFilter = ({ name, value }) => {
    if (name === "branch") {
      const filtered = order.filter((d) => d.branch === value);
      setorder(filtered);
    }

    if (name === "service") {
      const filtered = order.filter((d) => d.service === value);
      setorder(filtered);
    }
    if (value === "All"){
      axios
      .get("https://my-json-server.typicode.com/dsrishi/orders/orders")
      .then((res) => {
        setorder(res.data);
      });
    }
  };

  return (
    <div className='container'>
      <div
        className='form-select form-select-sm'
        style={{ marginTop: 20, marginBottom: 10 }}
      >
        <p>Filter by branch</p>
        <select
          className='form-select form-select-sm'
          onChange={(e) => handleFilter(e.target)}
          name='branch'
        >
          <option>All</option>
          {branch.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </div>
      <div className='form-select form-select-sm'>
        <p>Filter by service</p>
        <select
          className='form-select form-select-sm'
          onChange={(e) => handleFilter(e.target)}
          name='service'
        >
          <option>All</option>
          {service.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className='float-left'>
        <h3>Orders</h3>
      </div>

      <div className='float-right'>
        <button type='button' class='btn btn-secondary  float-end'>
          Secondary
        </button>
      </div>

      {!order ? (
        "No data found"
      ) : (
        <table className='table table-boardered' style={{ marginTop: 50 }}>
          <thead>
            <tr>
              <th></th>
              <th> ORDER ID</th>
              <th> CUSTOMER</th>
              <th> ADDED BY</th>
              <th> REFERENCE</th>
              <th> BRANCH</th>
              <th> SERVICE</th>
              <th> STATUS</th>
            </tr>
          </thead>
          <tbody>
            {order.map((order, index) => (
              <tr key={index}>
                <input type='checkbox'></input>
                <td>{order.id}</td>
                <td>
                  {order.customer.name}
                  <br></br>
                  {order.customer.city}
                </td>
                <td>{order.addedby}</td>
                <td>{order.reference}</td>
                <td>{order.branch}</td>
                <td>{order.service}</td>
                <td>
                  <p
                    className={
                      order.status === "Active"
                        ? "badge badge-success"
                        : "badge badge-danger"
                    }
                  >
                    {order.status}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Order;
