import { Fragment, useEffect, useState } from "react";
import { HotelCard, Navbar, Alert } from "../../components";
import { useDate, useCategory, useAlert } from "../../context";
import axios from "axios";
import { HOTELS_ENDPOINT } from "../../config/api";

export const SearchResults = () => {
  const { destination } = useDate();
  const { hotelCategory } = useCategory();
  const [hotels, setHotels] = useState([]);
  const { alert, setAlert } = useAlert();

  useEffect(() => {
    (async () => {
      try {
  const { data } = await axios.get(`${HOTELS_ENDPOINT}?category=${encodeURIComponent(hotelCategory)}`);
        setHotels(data);
      } catch (err) {
        setAlert({
          open: true,
          message: "Failed to load search results. Please try again.",
          type: "error"
        });
      }
    })();
  }, [destination, hotelCategory, setAlert]);

  const filteredSearchResults = hotels.filter(
    ({ city, address, state }) =>
      address.toLowerCase() === destination.toLowerCase() ||
      city.toLowerCase() === destination.toLowerCase() ||
      state.toLowerCase() === destination.toLowerCase()
  );

  return (
    <Fragment>
      <Navbar />
      <section className="main d-flex align-center gap-larger">
        {filteredSearchResults ? (
          filteredSearchResults.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))
        ) : (
          <h3>Nothing Found</h3>
        )}
      </section>
      {alert.open && <Alert />}
    </Fragment>
  );
};
