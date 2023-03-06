import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ActionType } from "../../redux/action-type";
import Header from "../Header/Header"
import './AddVacationModal.css'



function AddVacation() {
    let [vacationNewImg, setNewVacationImg] = useState("");
    let [vacationNewName, setNewVacationName] = useState("");
    let [vacationNewStartDate, setNewUpdatedStartDate] = useState("");
    let [vacationNewEndDate, setNewUpdatedEndDate] = useState("");
    let [vacationNewPrice, setUpdatedNewPrice] = useState(0);
    let [newImagePickerStyle, setNewImagePickerStyle] = useState("add-image-picker-style edit");
    let [newVacationNameStyle, setNewVacationNameStyle] = useState("add-vacation-title edit");
    let [newStartDateStyle, setStartDateStyle] = useState("add-start-date-style edit");
    let [newEndDateStyle, setNewEndDateStyle] = useState("add-end-date-style edit");
    let [newPriceStyle, setNewPriceStyle] = useState("add-price-style edit");
    let navigate = useNavigate();
    let dispatch = useDispatch();
 
    let onNewImageChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setNewImagePickerStyle("add-image-picker-style")
        let newImageLink = event.target.value
        let urlPrefix = "http";
        if (newImageLink.length == 4 && newImageLink.startsWith(urlPrefix) == false) {
            alert("Link must be a valid web address");
            setNewVacationImg("");
            event.target.value = "";
        }
        else if (newImageLink.length > 4 && newImageLink.startsWith(urlPrefix) == true) {
            setNewVacationImg(newImageLink);
        }

    }

    let onNewVacationName = (event: ChangeEvent<HTMLInputElement>) => {
        setNewVacationNameStyle("add-vacation-title");
        let newVacationName = event.target.value;
        setNewVacationName(newVacationName);
    }

    let onNewStartDateChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setStartDateStyle("add-start-date-style");
        let newStartDateChangedValue = event.target.value;
        setNewUpdatedStartDate(newStartDateChangedValue);
    }

    let onNewEndDateChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setNewEndDateStyle("add-end-date-style");
        let newEndDateChangedValue = event.target.value
        setNewUpdatedEndDate(newEndDateChangedValue);
    }

    let onPriceChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setNewPriceStyle("add-price-style")
        let numberedAddedValue = Number(event.target.value);

        if (isNaN(numberedAddedValue)) {
            alert("Please insert only Valid Prices!");
            setUpdatedNewPrice(0);
        }
        else {
            setUpdatedNewPrice(numberedAddedValue);
        }

    }

    let onCancelClick = () => {
        navigate('/');
    }



    let OnSaveClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            let amountOfFollowers = 0;
            let isFollowed = 0;
        let newVacationData = {amountOfFollowers: amountOfFollowers, destination:vacationNewName, endDate:vacationNewEndDate, img: vacationNewImg, isFollowed: isFollowed, price:vacationNewPrice, startDate:vacationNewStartDate };
        try {
            addedVacationValidations()
            await axios.post("http://localhost:3001/vacations", newVacationData)
            dispatch({type: ActionType.addVacation, payload: {newVacationData}});
            alert("Vacation was added successfully")
            navigate('/');
        }
        catch (error) {   
            alert(error);
        }
    }


let addedVacationValidations = (() => {
    if (vacationNewImg == "" && vacationNewName == "" && vacationNewStartDate == "" && vacationNewEndDate == "" && vacationNewPrice == 0) {
        setNewImagePickerStyle("add-image-picker-style empty-field-validation");
        setNewVacationNameStyle("add-vacation-title empty-field-validation");
        setStartDateStyle("add-start-date-style empty-field-validation");
        setNewEndDateStyle("add-end-date-style empty-field-validation");
        setNewPriceStyle("add-price-style empty-field-validation");
        addVacationValidationError()
    }

    if (vacationNewImg == "") {
        setNewImagePickerStyle("add-image-picker-style empty-field-validation");
        alert("Link Must be a Valid Url Address");
        addVacationValidationError()
    }

    if (vacationNewName == "") {
        setNewVacationNameStyle("add-vacation-title empty-field-validation");
        alert("Vacation Name is Required!");
        addVacationValidationError()
    }

    if (vacationNewName.match(/\d+/g)) {
        setNewVacationNameStyle("add-vacation-title empty-field-validation");
        throw new Error("Vacation Name Must Contain Only Letters!");
    }

    if (vacationNewStartDate == "") {
        setStartDateStyle("add-start-date-style empty-field-validation");
        alert("Start Date is Required!");
        addVacationValidationError()

    }

    if (vacationNewEndDate == "") {
        setNewEndDateStyle("add-end-date-style empty-field-validation");
        alert("End Date is Required!");
        addVacationValidationError()
    }

    if (vacationNewPrice == 0) {
        setNewPriceStyle("add-price-style empty-field-validation");
        alert("Vacation Price Must be Higher than 0!");
        addVacationValidationError()
    }


    let vacationNewStartDateNumber = Number(new Date(vacationNewStartDate));
    let vacationNewEndDateNumber = Number(new Date(vacationNewEndDate));
    if (vacationNewStartDateNumber - vacationNewEndDateNumber >= 0)
    {
        setStartDateStyle("add-start-date-style empty-field-validation");
        setNewEndDateStyle("add-end-date-style empty-field-validation");
        throw new Error("End Date Must be Later than Start Date!");
    }
})

let addVacationValidationError = (() => {
    throw new Error("All Vacation Fields are Required!");
})



return (
    <section className="layout">
        <header className="add-header-style">
            <Header />
        </header>
        <main>
            <div className="add-modal-container">
                <Modal.Dialog>
                    <Modal.Header >
                        <Modal.Title className="add-title-style">Create a New Vacation!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="add-body-style">
                        <Card.Img className="add-image-style" title="New Vacation Image" variant="top" src={vacationNewImg} alt="New Vacation Image" />
                        <input type="text" className={newImagePickerStyle} placeholder="New Image Link Address" title="New Image Link Address" onChange={e => onNewImageChanged(e)} />
                        <input type="text" className={newVacationNameStyle} maxLength={10} placeholder="New Vacation Name" title="New Vacation Name" value={vacationNewName} onChange={e => onNewVacationName(e)} />
                        <input type="date" className={newStartDateStyle} title="Start Date" value={vacationNewStartDate} onChange={e => onNewStartDateChanged(e)} />
                        <label className="add-between-dates-style">-</label>
                        <input type="date" className={newEndDateStyle} title="End Date" value={vacationNewEndDate} onChange={e => onNewEndDateChanged(e)} />
                        <input type="text" className={newPriceStyle} title="New Vacation Price" value={vacationNewPrice} maxLength={3} onChange={onPriceChanged} />
                        <span className="add-untis-area">$</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onCancelClick}>Cancel</Button>
                        <Button variant="primary" onClick={e => OnSaveClick(e)}>Save changes</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        </main >
    </section >
)
}
export default AddVacation