import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { HOTELS_ENDPOINT } from "../../config/api";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Navbar,
  HotelCard,
  Categories,
  SearchStayWithDate,
  Filter,
  AuthModal,
  ProfileDropDown,
  Alert
} from "../../components";
import { Hero } from './Hero';
import "./Home.css";
import { useCategory, useDate, useFilter, useAuth, useAlert } from "../../context";
import {
  getHotelsByPrice,
  getHotelsByRoomsAndBeds,
  getHotelsByPropertyType,
  getHotelsByRatings,
  getHotelsByCancelation,
} from "../../utils";

export const Home = () => {
  const [hasMore, setHasMore] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(16);
  const [testData, setTestData] = useState([]);
  const [hotels, setHotels] = useState([]);
  const { hotelCategory } = useCategory();
  const { isSearchModalOpen } = useDate();
  const {
    isFilterModalOpen,
    priceRange,
    noOfBathrooms,
    noOfBedrooms,
    noOfBeds,
    propertyType,
    traveloRating,
    isCancelable,
  } = useFilter();

  const { isAuthModalOpen, isDropDownModalOpen } = useAuth();
  const { alert, setAlert } = useAlert();

  useEffect(() => {
    let cancelled = false;
    const maxAttempts = 5;
    const baseDelayMs = 700; // initial retry delay

    const fetchWithRetry = async (attempt = 1) => {
      try {
        setHotels([]);
        setTestData([]);
        setIsLoading(true);

        const url = hotelCategory
          ? `${HOTELS_ENDPOINT}?category=${encodeURIComponent(hotelCategory)}`
          : HOTELS_ENDPOINT;

        const { data } = await axios.get(url);
        if (cancelled) return;
        setIsLoading(false);
        setTestData(data);
        setHotels(data ? data.slice(0, 16) : []);
      } catch (err) {
        if (cancelled) return;
        const status = err?.response?.status;
        // If DB not ready yet (503), retry with backoff
        if (status === 503 && attempt < maxAttempts) {
          const delay = baseDelayMs * Math.pow(1.4, attempt - 1);
          setTimeout(() => fetchWithRetry(attempt + 1), delay);
          return;
        }
        setIsLoading(false);
        setAlert({
          open: true,
          message:
            status === 503
              ? "Service starting up. Please try again shortly."
              : "Failed to load hotels. Please try again.",
          type: "error"
        });
      }
    };

    fetchWithRetry();
    return () => {
      cancelled = true;
    };
  }, [hotelCategory, setAlert]);

  const [isLoading, setIsLoading] = useState(false);


  const fetchMoreData = () => {
    if (hotels.length >= testData.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      if (hotels && hotels.length > 0) {
        setHotels(
          hotels.concat(testData.slice(currentIndex, currentIndex + 16))
        );
        setCurrentIndex((prev) => prev + 16);
      } else {
        setHotels([]);
      }
    }, 1000);
  };

  const filteredHotels = useMemo(() => {
    const filteredHotelsByPrice = getHotelsByPrice(hotels, priceRange);
    const filteredHotelsByBedsAndRooms = getHotelsByRoomsAndBeds(
      filteredHotelsByPrice,
      noOfBathrooms,
      noOfBedrooms,
      noOfBeds
    );
    const filteredHotelsByPropertyType = getHotelsByPropertyType(
      filteredHotelsByBedsAndRooms,
      propertyType
    );
    const filteredHotelsByRatings = getHotelsByRatings(
      filteredHotelsByPropertyType,
      traveloRating
    );
    return getHotelsByCancelation(
      filteredHotelsByRatings,
      isCancelable
    );
  }, [hotels, priceRange, noOfBathrooms, noOfBedrooms, noOfBeds, propertyType, traveloRating, isCancelable]);

  return (
    <div className="relative">
      <Navbar route="home"/>
  <Hero />
      <Categories />
      {isLoading ? (
        <main className="main d-flex align-center wrap gap-larger">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="hotel-skeleton" />
          ))}
        </main>
      ) : hotels && hotels.length > 0 ? (
        <main className="main">
          <InfiniteScroll
            className="hotel-list"
            dataLength={filteredHotels.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              <div className="d-flex align-center justify-center loader-row">
                <h4>Loading...</h4>
              </div>
            }
          >
            {filteredHotels.map((hotel) => (
              <HotelCard key={hotel._id} hotel={hotel} />
            ))}
          </InfiniteScroll>
        </main>
      ) : (
        <main className="main d-flex align-center justify-center">
          <div className="welcome-message">
            <h2>🌟 Welcome to Your Travel Adventure! 🌟</h2>
            <p>Discover amazing hotels and destinations worldwide</p>
            <div className="welcome-actions">
              <button className="button btn-primary" onClick={() => window.location.reload()}>
                🔄 Load Hotels
              </button>
            </div>
          </div>
        </main>
      )}
      {isDropDownModalOpen && <ProfileDropDown />}
      {isSearchModalOpen && <SearchStayWithDate />}
      {isFilterModalOpen && <Filter />}
      {isAuthModalOpen && <AuthModal />}
      {alert.open && <Alert />}
    </div>
  );
};
