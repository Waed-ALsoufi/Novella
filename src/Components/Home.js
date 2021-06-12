import Reviws from "./Reviws.js";
import Quotes from "./Quotes";
import "../Style/Home.css";
import Slider from "./Slider";

const Home = () => {
  return (
    <div className="main">
      <Slider />
      <div>
        <Quotes />
      </div>

      <Reviws />
      <button className="GoToMap">Go to map</button>
    </div>
  );
};
export default Home;
