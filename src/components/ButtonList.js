import React from "react";
import Button from "./Button";

const list = [
  "All",
  "Gaming",
  "Songs",
  "Live",
  "Soccer",
  "Cricket",
  "Cooking",
  "News",
  "Valentines",
];

const ButtonList = () => {
  return (
    <div className="flex">
      {list.map((btnName, index) => (
        <Button key={index} name={btnName} />
      ))}
      {/* <Button name="All" />
      <Button name="Gaming" />
      <Button name="Songs" />
      <Button name="Live" />
      <Button name="Soccer" />
      <Button name="Cricket" />
      <Button name="Cooking" />
      <Button name="News" />
      <Button name="Valentines" /> */}
    </div>
  );
};

export default ButtonList;
