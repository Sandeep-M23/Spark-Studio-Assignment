import { useEffect, useState, useRef } from "react";
import Card from "./Components/Card/Card";
import jsonData from "../sample-response.json";
import "./App.css";

interface Data {
  display_name:string;
  rating:string;
  games_count:string;
  category_name:string;
  original_price:number;
  discounted_price:number;
  name: string;
  certificate_count:number;
  num_classes:number;
  min_age: number;
  max_age: number;
  pitch:string;
  curriculum_outcomes:string[];
}

const App: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [filteredData, setFilteredData] = useState<Data[]>([]);
  const [selected, setSelected] = useState<string>("");
  const ref = useRef<HTMLDivElement>(null);

  const jsonToArray = (jsonData: any) => {
    let result: Data[] = [];
    let keys = Object.keys(jsonData);
    keys.forEach(function (key) {
      jsonData[key].map((i: Data) => result.push(i));
    });
    return result;
  };

  useEffect(() => {
    let requiredData = jsonToArray(jsonData);
    setData(requiredData);
  }, []);

  const onFilterData = (min: number, max: number, type: string) => {
    const filtered = data.filter((d) => {
      return d.min_age >= min && d.max_age <= max;
    });
    setFilteredData(filtered);
    setSelected(type);
  };

  // useEffect(() => {
  //   const checkClickOutside = (e) => {
  //     if (!ref.current.contains(e.target)) {
  //       setFilteredData([]);
  //       setSelected("")
  //     }
  //   };
  //   document.addEventListener("mousedown", checkClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", checkClickOutside);
  //   };
  // }, []);

  let Data =
    filteredData.length === 0
      ? data.map((data, index) => {
          return <Card key={index} data={data} />;
        })
      : filteredData.map((data, index) => {
          return <Card key={index} data={data} />;
        });

  return (
    <div className="App">
      <div className="filter-section">
        <div className="filter">
          <button className={`filter-btn ${selected === "Junior" && "selected"}`} onClick={() => onFilterData(6, 10, "Junior")}>
            Junior <br />
            (Age 6-10)
          </button>
         {selected === "Junior" && <img src="./assests/SVG/pointer.svg" />}
        </div>
        <div className="filter"> 
          <button className={`filter-btn ${selected === "Senior" && "selected"}`} onClick={() => onFilterData(10, 15, "Senior")}>
            Senior <br />
            (Age 10-15)
          </button>
          {selected === "Senior" && <img src="./assests/SVG/pointer.svg" />}
        </div>
      </div>
      <div className="card-section" ref={ref}>{Data}</div>
    </div>
  );
};

export default App;
