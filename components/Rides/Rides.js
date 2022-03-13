import React, { useState, useEffect } from "react";
import styles from "../../styles/Rides.module.css";
import { BiMenuAltLeft } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
import { getDistance } from "../../utils/helpers";

export default function Nav({ rides, user }) {
  const [type, setType] = useState("nearest");
  const [ridesSel, setRidesSel] = useState([]);
  const [upcomingRides, setUpcomingRides] = useState(
    rides.filter(function (ride) {
      var now = new Date();
      var rideDate = new Date(ride.date);
      if (rideDate > now) return true;
      return false;
    })
  );
  const [pastRides, setPastRides] = useState(
    rides.filter(function (ride) {
      var now = new Date();
      var rideDate = new Date(ride.date);
      if (rideDate < now) return true;
      return false;
    })
  );

  const [showFilter, setShowFilter] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    if (selectedCity != null)
      var filterByState = rides.filter(
        (ride) => ride.state == e.target.value && ride.city == selectedCity
      );
    else
      var filterByState = rides.filter((ride) => ride.state == e.target.value);
    setRidesSel(filterByState);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    if (selectedState != null)
      var filterByCity = rides.filter(
        (ride) => ride.city == e.target.value && ride.state == selectedState
      );
    else var filterByCity = rides.filter((ride) => ride.city == e.target.value);
    setRidesSel(filterByCity);
  };

  const handleCloseFilterBox = () => {
    setSelectedCity(null);
    setSelectedState(null);
    setShowFilter(false);
    setRidesSel(rides);
    setType("nearest");
  };

  useEffect(() => {
    var tStates = [];
    var tCities = [];
    rides.forEach(function (ride) {
      ride.distance = getDistance(ride.station_path, user.station_code);
      tStates.push(ride.state);
      tCities.push(ride.city);
    });
    setRidesSel(rides);
    setStates([...new Set(tStates)]);
    setCities([...new Set(tCities)]);
  }, []);

  useEffect(() => {
    switch (type) {
      case "nearest":
        setRidesSel(rides);
        break;
      case "upcoming":
        setRidesSel(upcomingRides);
        break;
      case "past":
        setRidesSel(pastRides);
        break;
      default:
        alert("invalid option");
        break;
    }
  }, [type]);

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <div className={styles.types}>
          <ul>
            <li className={type == "nearest" ? styles.active : ""}>
              <button onClick={() => setType("nearest")}>Nearest Rides</button>
            </li>
            <li className={type == "upcoming" ? styles.active : ""}>
              <button onClick={() => setType("upcoming")}>
                Upcoming Rides ({upcomingRides.length})
              </button>
            </li>
            <li className={type == "past" ? styles.active : ""}>
              <button onClick={() => setType("past")}>
                Past Rides ({pastRides.length})
              </button>
            </li>
          </ul>
        </div>
        <div className={styles.filters}>
          <button onClick={() => setShowFilter(true)}>
            <BiMenuAltLeft size={25} />
            <div>Filters</div>
          </button>
        </div>

        <div className={showFilter ? styles.filterBox : styles.hideFilterBox}>
          <div className={styles.titleCon}>
            <div className={styles.title}>Filters</div>
            <MdOutlineCancel
              onClick={handleCloseFilterBox}
              className={styles.cancelIcon}
              size={25}
            />
          </div>
          <div className={styles.state}>
            <select id="state" placeholder="State" onChange={handleStateChange}>
              <option value={null}>State</option>
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.city}>
            <select id="state" placeholder="City" onChange={handleCityChange}>
              <option value={null}>City</option>
              {cities.map((c) => (
                <option key={c} value={c} onClick={() => console.log(c)}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className={styles.rides}>
        {ridesSel.map((ride, index) => (
          <div className={styles.ride} key={index}>
            <div className={styles.img}>
              <img src={ride.map_url} alt="ride-map" />
            </div>
            <div className={styles.details}>
              <ul>
                <li>
                  Ride Id: <span>{ride.id}</span>
                </li>
                <li>
                  Origin Station: <span>{ride.origin_station_code}</span>
                </li>
                <li>
                  station_path: <span>{JSON.stringify(ride.station_path)}</span>
                </li>
                <li>
                  Date: <span>{ride.date}</span>
                </li>
                <li>
                  Distance: <span>{ride.distance}</span>
                </li>
              </ul>
            </div>
            <div className={styles.additional}>
              <div className={styles.tag}>{ride.city}</div>
              <div className={styles.tag}>{ride.state}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
