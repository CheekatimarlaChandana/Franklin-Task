import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Tab, Nav } from "react-bootstrap";
import { FaHome, FaMapMarker } from "react-icons/fa";

const API_URL = "http://test.api.boxigo.in/sample-data/";

const Boxigo = () => {
  const [moveDetails, setMoveDetails] = useState([]);
  const [quoteData, setQuoteData] = useState({});
  const [itemsData, setItemsData] = useState([]);
  const [viewMoreData, setViewMoreData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("moveDetails");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(API_URL);
        console.log(data);
        setMoveDetails(data.Customer_Estimate_Flow);
        setQuoteData(data.Quote);
        setItemsData(data.Items);
        setViewMoreData(data.ViewMore);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <Container>
      <div className="row">
        <div className="col-md-2">
          <Nav variant="pills" className="flex-column mt-4 ">
            <Nav.Item>
              <Nav.Link
                eventKey="moveDetails"
                className={activeTab === "moveDetails" ? "active" : ""}
                onClick={() => handleTabChange("moveDetails")}
              >
                Move Details
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="quote"
                className={activeTab === "quote" ? "active" : ""}
                onClick={() => handleTabChange("quote")}
              >
                Get Quote
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="items"
                className={activeTab === "items" ? "active" : ""}
                onClick={() => handleTabChange("items")}
              >
                Items
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="viewmore"
                className={activeTab === "viewmore" ? "active" : ""}
                onClick={() => handleTabChange("viewmore")}
              >
                View More
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <div className="col-md-10">
          <Tab.Container activeKey={activeTab}>
            <Tab.Content className="mt-4">
              <Tab.Pane eventKey="moveDetails">
                <h1>Move Details</h1>
                {isLoading ? (
                  <p>Loading move details...</p>
                ) : moveDetails.length > 0 ? (
                  <div className="container">
                    {moveDetails.map((val, ind) => (
                      <div className="row" key={ind}>
                        <div className="col-md-4">
                          <strong>From:</strong> <br />
                          <p>{val.moving_from} </p>
                          <div className="d-block">
                            {" "}
                            <p>
                              <FaHome /> {val.property_size}
                              <FaMapMarker /> {val.distance}
                            </p>
                          </div>
                        </div>
                        <div className="col-md-4 p-10">
                          <strong>To:</strong> <br />
                          {val.moving_to}
                        </div>
                        <div className="col-md-4">
                          <strong>Request:</strong> <br />
                          {val.estimate_id}
                        </div>
                        <div className="col-md-12  d-flex justify-content-end gap-3 ">
                          <button className="btn btn-primary">
                            View More Details
                          </button>
                          <button className="btn btn-primary">
                            Quotes Awaiting
                          </button>
                        </div>
                        <hr />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No move details available.</p>
                )}
              </Tab.Pane>
              <Tab.Pane eventKey="quote">
                <h1>Get Quote</h1>
                {isLoading ? (
                  <p>Loading quote data...</p>
                ) : quoteData && Object.keys(quoteData || {}).length > 0 ? (
                  <div>
                    <p>Quote ID: {quoteData.quote_id}</p>
                    <p>Quote Details: {quoteData.quote_details}</p>
                  </div>
                ) : (
                  <p>No quote data available.</p>
                )}
              </Tab.Pane>
              <Tab.Pane eventKey="items">
                <h1>Items</h1>
                {isLoading ? (
                  <p>Loading items data...</p>
                ) : itemsData && itemsData.length > 0 ? (
                  <ul>
                    {itemsData.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No items data available.</p>
                )}
                {/* {isLoading ? (
                  <p>Loading items data...</p>
                ) : itemsData && itemsData.length > 0 ? (
                  <ul>
                    {itemsData.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No items data available.</p>
                )} */}
              </Tab.Pane>
              <Tab.Pane eventKey="viewmore">
                <h1>View More</h1>
                {isLoading ? (
                  <p>Loading view more data...</p>
                ) : viewMoreData &&
                  Object.keys(viewMoreData || {}).length > 0 ? (
                  <div>
                    <p>View More ID: {viewMoreData.viewmore_id}</p>
                    <p>View More Details: {viewMoreData.viewmore_details}</p>
                  </div>
                ) : (
                  <p>No view more data available.</p>
                )}
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </Container>
  );
};

export default Boxigo;
