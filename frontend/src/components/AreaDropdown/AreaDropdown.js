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
        <div className="home-content__area">
          <Link
            className="home-content__area-text"
            href={`/${area._id}`}
            onClick={() => {
              setAreaDropdownOpen(!areaDropdownOpen);
            }}
            key={area._id}
          >
            {area.area}
          </Link>
          <div className="icon__delete-wrapper">
            <p
              className="icon__delete"
              onClick={() => handleAreaDeletion(area._id)}
            >
              X
            </p>
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
          <p className="home-content__area-text">Add an area </p>
        </div>
      )}
    </div>
  );
};

export default AreaDropdown;
