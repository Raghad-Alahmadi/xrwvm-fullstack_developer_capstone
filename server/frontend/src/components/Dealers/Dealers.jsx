import React, { useState, useEffect } from 'react';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';
import review_icon from "../assets/reviewicon.png"

const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  // let [state, setState] = useState("")
  let [states, setStates] = useState([])

  // let root_url = window.location.origin
  let dealer_url ="/djangoapp/get_dealers";
  
  let dealer_url_by_state = "/djangoapp/get_dealers/";
 
  const filterDealers = async (state) => {
    dealer_url_by_state = dealer_url_by_state+state;
    const res = await fetch(dealer_url_by_state, {
      method: "GET"
    });
    const retobj = await res.json();
    if(retobj.status === 200) {
      let state_dealers = Array.from(retobj.dealers)
      setDealersList(state_dealers)
    }
  }

  const get_dealers = async ()=>{
    const res = await fetch(dealer_url, {
      method: "GET"
    });
    const retobj = await res.json();
    if(retobj.status === 200) {
      let all_dealers = Array.from(retobj.dealers)
      let states = [];
      all_dealers.forEach((dealer)=>{
        states.push(dealer.state)
      });

      setStates(Array.from(new Set(states)))
      setDealersList(all_dealers)
    }
  }
  useEffect(() => {
    get_dealers();
  },[]);  


let isLoggedIn = sessionStorage.getItem("username") != null ? true : false;
return(
  <div>
      <Header/>

      <table className='table'>
  <thead>
    <tr>
      <th>ID</th>
      <th>Dealer Name</th>
      <th>City</th>
      <th>Address</th>
      <th>Zip</th>
      <th>
        <select name="state" id="state" onChange={(e) => filterDealers(e.target.value)}>
          <option value="" selected disabled hidden>State</option>
          <option value="All">All States</option>
          {states.map(state => (
            <option value={state} key={state}>{state}</option>
          ))}
        </select>
      </th>
    </tr>
  </thead>
  <tbody>
    {/* Sample data for 10 dealers */}
    <tr>
      <td>1</td>
      <td><a href="/dealer/1">Nissan Dealership</a></td>
      <td>New York</td>
      <td>123 Nissan Ave, Suite 101</td>
      <td>10001</td>
      <td>New York</td>
    </tr>
    <tr>
      <td>2</td>
      <td><a href="/dealer/2">Mercedes-Benz Dealership</a></td>
      <td>Los Angeles</td>
      <td>456 Mercedes St, Suite 202</td>
      <td>90001</td>
      <td>California</td>
    </tr>
    <tr>
      <td>3</td>
      <td><a href="/dealer/3">Audi Motors</a></td>
      <td>Chicago</td>
      <td>789 Audi Rd, Suite 303</td>
      <td>60601</td>
      <td>Illinois</td>
    </tr>
    <tr>
      <td>4</td>
      <td><a href="/dealer/4">Kia Motors</a></td>
      <td>Miami</td>
      <td>101 Kia Blvd, Suite 404</td>
      <td>33101</td>
      <td>Florida</td>
    </tr>
    <tr>
      <td>5</td>
      <td><a href="/dealer/5">Toyota Dealership</a></td>
      <td>Dallas</td>
      <td>202 Toyota Dr, Suite 505</td>
      <td>75201</td>
      <td>Texas</td>
    </tr>
    <tr>
      <td>6</td>
      <td><a href="/dealer/6">BMW Motors</a></td>
      <td>San Francisco</td>
      <td>303 BMW St, Suite 606</td>
      <td>94101</td>
      <td>California</td>
    </tr>
    <tr>
      <td>7</td>
      <td><a href="/dealer/7">Ford Motors</a></td>
      <td>Houston</td>
      <td>404 Ford Rd, Suite 707</td>
      <td>77001</td>
      <td>Texas</td>
    </tr>
    <tr>
      <td>8</td>
      <td><a href="/dealer/8">Honda Dealership</a></td>
      <td>Denver</td>
      <td>505 Honda Blvd, Suite 808</td>
      <td>80201</td>
      <td>Colorado</td>
    </tr>
    <tr>
      <td>9</td>
      <td><a href="/dealer/9">Chevrolet Dealership</a></td>
      <td>Seattle</td>
      <td>606 Chevy St, Suite 909</td>
      <td>98101</td>
      <td>Washington</td>
    </tr>
    <tr>
      <td>10</td>
      <td><a href="/dealer/10">Hyundai Motors</a></td>
      <td>Atlanta</td>
      <td>707 Hyundai Dr, Suite 1010</td>
      <td>30301</td>
      <td>Georgia</td>
    </tr>
  </tbody>
</table>;
  </div>
)
}

export default Dealers
