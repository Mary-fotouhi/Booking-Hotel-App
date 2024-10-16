import {MdLocationOn} from "react-icons/md";
import {HiCalendar, HiMinus, HiPlus, HiSearch} from "react-icons/hi";
import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from "react-date-range";



function Header(){
    const [destination , setDestination] = useState("");
    const [openOptions , setOpenOptions] = useState(false);
    const [options , setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    });
    const [date , setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        }
    ]);
    const [openDate , setOpenDate] = useState(false)

    const handleOptions = (name , operation) =>{
        setOptions((prev) =>{
            return{
                ...prev,
                [name] : operation ==="inc" ? options[name] +1 : options[name] -1,
            }
        })
    }
    
    
    return(
        <div className="header">
            <div className="headerSearch">
                <div className="headerSearchItem">
                    <MdLocationOn className="headerIcon locationIcon"/>
                    <input
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    type="text"
                    placeholder="Where to go?"
                    className="headerSearchInput"
                    name="destination"
                    id="destination" />
                <span className="seperator"></span>
                </div>
                <div className="headerSearchItem">
                    <HiCalendar className="headerIcon dateIcon"/>
                    <div onClick={() => setOpenDate(!openDate)} className="dateDropDown">14/09/2024</div>
                    {openDate && (
                        <DateRange
                        onChange={(item) => setDate([item.selection])}
                        ranges={date}
                        classNames="date"
                        minDate={new Date()}
                        moveRangeOnFirstSelection={true}
                        />
                    )}

                <span className="seperator"></span>
                </div>
                <div className="headerSearchItem">
                    <div 
                     id="optionDropDown"
                     onClick={() => setOpenOptions ( !openOptions)}>
                        {options.adult} adult &bull; {options.children} children &bull; {options.room} room</div>
                     {openOptions && < GuestOptionList
                                        handleOptions={handleOptions}
                                        options={options}
                                        setOpenOptions={setOpenOptions}/>}
                <span className="seperator"></span>
                </div>
                <div className="headerSearchItem">
                    <button className="headerSearchBtn">
                        <HiSearch className="headerIcon"/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header;


function GuestOptionList({options , handleOptions , setOpenOptions  }){

    const optionsRef = useRef();
    useOutsideClick(optionsRef , "optionDropDown" , () => setOpenOptions(false));

    return(
        <div className="guestOptions" ref={optionsRef}>
           < OptionItem
           type="adult"
           options={options}
           minLimit={1}
           handleOptions={handleOptions}/>
           
           < OptionItem 
            type="children"
            options={options}
            minLimit={0}
            handleOptions={handleOptions}/> 
           
           < OptionItem
           type="room"
           options={options}
           minLimit={1}
           handleOptions={handleOptions}/> 
        </div>
    )
}

function OptionItem({options , type , minLimit , handleOptions}){
    return(
        <div className="guestOptionItem">
            <span className="optionText">{type}</span>
                <div className="optinCounter">
                    <button className="optionCounterBtn"
                            disabled={options[type] <= minLimit}
                            onClick={() => handleOptions(type , "dec")}>
                      <HiMinus className="icon"/></button>
                    <span className="optionCounterNumber">&nbsp; {options[type]} &nbsp;</span>
                    <button className="optionCounterBtn"
                            onClick={() => handleOptions( type , "inc")}>
                      <HiPlus className="icon"/></button>
                </div>

    </div>

    )
}
