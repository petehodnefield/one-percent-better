import React from "react";
import Link from "next/link";
const AreaDropdown = ({
  meData,
  areaDropdownOpen,
  handleAreaDeletion,
  handleNewArea,
  setNewArea,
  setAddNewAreaOpen,
  addNewAreaOpen,
  setAreaDropdownOpen,
}) => {
  return (
    <div className="home-content__areas-wrapper">
      {meData.me.areas.map((area) => (
        <div key={area._id} className="home-content__area">
          <Link
            className="home-content__area-text"
            href={`/${area._id}`}
            onClick={() => {
              setAreaDropdownOpen(!areaDropdownOpen);
            }}
          >
            {area.area}
          </Link>
          <div
            onClick={() => handleAreaDeletion(area._id)}
            className="icon__delete-wrapper"
          >
            <p className="icon__delete">X</p>
          </div>
        </div>
      ))}
      {addNewAreaOpen ? (
        <form
          onSubmit={(e) => handleNewArea(e)}
          className="home-content__area-form"
          action=""
        >
          <input
            className="form__input home-content__area-input"
            type="text"
            onChange={(e) => setNewArea(e.target.value)}
          />
          <button type="submit" className="home-content__area-button">
            Submit
          </button>
        </form>
      ) : (
        <div
          onClick={() => {
            setAddNewAreaOpen(!addNewAreaOpen);
          }}
          className="home-content__area"
        >
          <p className="home-content__area-text home-content__area-text--full">
            Add an area{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default AreaDropdown;
