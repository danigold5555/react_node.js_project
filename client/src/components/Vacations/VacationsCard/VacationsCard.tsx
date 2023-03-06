import IVacations from "../../../Models/IVacations";
import Card from 'react-bootstrap/Card'
import { Container } from "react-bootstrap";
import './VacationCard.css'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { RiSave2Fill } from "react-icons/ri";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/appState";
import { ActionType } from "../../../redux/action-type";


export interface IProps {
  vacation: IVacations
}

function VacationsCard(props: IProps) {
  let currentUserDetails = useSelector((state: AppState) => state.currentUserDetails);
  let currentUserType = currentUserDetails.userType;
  let userFollowedVacationsArray = useSelector((state: AppState) => state.userFollowedVacationsArray);
  let [isVacationChecked, setVacationChecked] = useState(false);
  let [isVacationFollowButtonDisabled, disableVacationFollowButton] = useState(true);
  let [inputsIsReadOnly, setInputsReadOnlyMode] = useState(true);
  let [updatedPrice, setUpdatedPrice] = useState(props.vacation.price);
  let [priceStyle, setPriceStyle] = useState("price-style");
  let [startDateStyle, setStartDateStyle] = useState("start-date-style");
  let [endDateStyle, setEndDateStyle] = useState("end-date-style");
  let [updatedStartDate, setUpdatedStartDate] = useState(props.vacation.startDate);
  let [updatedEndDate, setUpdatedEndDate] = useState(props.vacation.endDate);
  let [updatedVacationImg, setVacationImg] = useState(props.vacation.img);
  let [newImagePickerStyle, setNewImagePickerStyle] = useState("new-image-picker-style");
  let dispatch = useDispatch();
  let currentToken = localStorage.getItem('token');

  useEffect(() => {
    if (currentUserType == "user") {
      organizeUserFollowedVacationsOnUi()
      disableVacationFollowButton(false)
    }
  }, [])

  let onCardFollowCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let isVacationChecked = e.target.checked;
    let followedVacationId = props.vacation.id;
    let isFollowedVacation = 0;

    if (isVacationChecked == true) {
      isFollowedVacation = 1;
    }

    let vacationFollowedData = {vacationId: followedVacationId, isFollowed: isFollowedVacation, currentToken: currentToken }
    try {
      await axios.put("http://localhost:3001/vacations/followedvacation", vacationFollowedData)
      dispatch({ type: ActionType.isFollowedVacation, payload: { followedVacationId, isFollowedVacation } });
      if (isVacationChecked == true) {
        setVacationChecked(true)
        alert("Vacation is now followed");
      }
      else {
        setVacationChecked(false)
        alert("Vacation was unfollowed");
      }
    }
    catch (error: any) {
      alert(error.message);
    }
  }


  let onDeleteVacation = async (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    let deletedVacationId = props.vacation.id;
    let deletedVacationObject = {
      data: {
        deletedVacationId: deletedVacationId,
        deletedVacationDestination: props.vacation.destination
      }
    }
    window.confirm("Are You Sure You Want to Delete This Vacation?");
    if (window.confirm("Are You Sure You Want to Delete This Vacation?") == true) {
      try {
        await axios.delete(`http://localhost:3001/vacations/${deletedVacationId}`, deletedVacationObject)
        dispatch({ type: ActionType.deleteVacation, payload: { deletedVacationObject } });
        alert("Vacation was deleted successfully!");
      }
      catch (error: any) {
        alert(error.message);
      }
    }
  }

  let onPriceChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setPriceStyle("price-style edit")
    let numberedChangedPriceValue = Number(event.target.value);
    if (isNaN(numberedChangedPriceValue)) {
      alert("Please insert only Valid Prices!");
      setUpdatedPrice(props.vacation.price);
    }
    else {
      setUpdatedPrice(numberedChangedPriceValue);
    }
  }

  let onStartDateChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStartDateStyle("start-date-style edit");
    setInputsReadOnlyMode(false);
    let startDateChangedValue = event.target.value;
    setUpdatedStartDate(startDateChangedValue);
  }

  let onEndDateChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setEndDateStyle("end-date-style edit");
    setInputsReadOnlyMode(false);
    let endDateChangedValue = event.target.value;
    setUpdatedEndDate(endDateChangedValue);
  }

  let onNewImageChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setVacationImg("")
    setNewImagePickerStyle("new-image-picker-style show edit");
    let newImageLink = event.target.value;
    let urlPrefix = "http";

    if (newImageLink.length == 4 && newImageLink.startsWith(urlPrefix) == false) {
      alert("Link Must Start With 'http' Prefix");
      setNewImagePickerStyle("new-image-picker-style show empty-field-validation");
      event.target.value = "";
    }
    else if (newImageLink.length > 4 && newImageLink.startsWith(urlPrefix) == true) {
      setVacationImg(newImageLink);
    }

  }

  let onEditVacation = ((e: React.MouseEvent<SVGElement, MouseEvent>) => {
    setInputsReadOnlyMode(false);
    setPriceStyle("price-style edit");
    setStartDateStyle("start-date-style edit");
    setEndDateStyle("end-date-style edit");
    setNewImagePickerStyle("new-image-picker-style show ");
  })


  let onSaveVacationChanges = async (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    let vacationDestination = props.vacation.destination;
    let VacationId = props.vacation.id;
    let vacationChangedDetailsData = {id: VacationId, destination: vacationDestination, price: updatedPrice, startDate: updatedStartDate, endDate: updatedEndDate, img: updatedVacationImg };
    try {
      saveVacationChangesValidations()
      await axios.put("http://localhost:3001/vacations", vacationChangedDetailsData)
      dispatch({ type: ActionType.editVacation, payload: { vacationChangedDetailsData } });
      alert("Vacation was updated successfully!");
    }
    catch (error: any) {
      alert(error.message);
    }
  }

  let saveVacationChangesValidations = (() => {
    if (updatedStartDate == "" && updatedEndDate == "" && updatedPrice == 0 && updatedVacationImg == "") {
      setPriceStyle("price-style empty-field-validation");
      setStartDateStyle("start-date-style empty-field-validation");
      setEndDateStyle("end-date-style empty-field-validation");
      setNewImagePickerStyle("new-image-picker-style show empty-field-validation");
      throw new Error("All Vacation Fields are Required!");
    }
    else {
      if (updatedStartDate == "") {
        setStartDateStyle("start-date-style empty-field-validation");
        throw new Error("Start Date is Required!")
      }

      if (updatedEndDate == "") {
        setEndDateStyle("end-date-style empty-field-validation");
        throw new Error("End Date is Required!")
      }

      if (updatedPrice == 0) {
        setPriceStyle("price-style empty-field-validation");
        throw new Error("Vacation Price Must be Higher than 0!")
      }

      if (updatedVacationImg == "") {
        setNewImagePickerStyle("new-image-picker-style show empty-field-validation");
        throw new Error("Link Must be a Valid Url Address");

      }

      let vacationUpdatedStartDateNumber = Number(new Date(updatedStartDate));
      let vacationUpdatedEndDateNumber = Number(new Date(updatedEndDate));

      if (vacationUpdatedStartDateNumber - vacationUpdatedEndDateNumber >= 0) {
        setEndDateStyle("end-date-style empty-field-validation");
        setStartDateStyle("start-date-style empty-field-validation");
        throw new Error("End Date Must be Later than Start Date!");
      }
    }

    if (updatedStartDate != "" && updatedEndDate != "" && updatedPrice != 0 && updatedVacationImg != "") {
      setInputsReadOnlyMode(true);
      setPriceStyle("price-style");
      setStartDateStyle("start-date-style");
      setEndDateStyle("end-date-style");
      setNewImagePickerStyle("new-image-picker-style");
    }
  })


  let organizeUserFollowedVacationsOnUi = () => {
    let vacationId = props.vacation.id;
    userFollowedVacationsArray.map(followedVacationId => {
      if (followedVacationId == vacationId) {
        dispatch({ type: ActionType.userFollowedVacationsOrder, payload: { vacationId } });
        setVacationChecked(true)
      }
    })
  }

  return (
    <Container fluid className="container-style" key={props.vacation.id}>
      {currentUserType == "admin" && (<input type="text" className={newImagePickerStyle} defaultValue={updatedVacationImg} placeholder="New Image Link Address" title="Please Insert The New Image Link Address" onChange={e => onNewImageChanged(e)} />)}
      {currentUserType == "admin" && (<div className="iconsRow">
        <BsFillTrashFill title="Delete Vacation" onClick={e => onDeleteVacation(e)} className="delete-icon" />
        <RiSave2Fill title="Save Vacation Changes" onClick={e => onSaveVacationChanges(e)} className="save-icon" />
        <BsFillPencilFill title="Edit Vacation Details" onClick={e => onEditVacation(e)} className="edit-icon" />
      </div>)}
      <Col>
        <Card>
          <Card.Img className="image-style" variant="top" src={updatedVacationImg} alt="pic" />
          <Card.Body>
            <Card.Text>
              <Card.Title className="card-title">{props.vacation.destination}</Card.Title>
              <div className="dates-row">
                <input type="date" title="End Date" className={endDateStyle} value={updatedEndDate} readOnly={inputsIsReadOnly} onChange={e => onEndDateChanged(e)} />
                <span className="between-dates">-</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="date" title="Start Date" className={startDateStyle} value={updatedStartDate} readOnly={inputsIsReadOnly} onChange={e => onStartDateChanged(e)} />
              </div>
              <br />
              <div className="price-units-row">
                <input type="text" className={priceStyle} value={updatedPrice} readOnly={inputsIsReadOnly} maxLength={3} onChange={onPriceChanged} />
                <span className="units-area">$</span>
              </div>
              {currentUserType != "admin" && (<div className="followers-style">#Followers: {props.vacation.amountOfFollowers}</div>)}
              {currentUserType != "admin" && (<div className="follow-checkbox-style">
                <Form className="checkbox-style">
                  <div className="mb-3">
                    <Form.Check type="switch" disabled={isVacationFollowButtonDisabled} checked={isVacationChecked} key={props.vacation.id} onChange={e => onCardFollowCheck(e)}>
                    </Form.Check>
                  </div>
                </Form>
                  <label className="follow-vacation-style">Follow This Vacation!</label>
              </div>)}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
}

export default VacationsCard;

