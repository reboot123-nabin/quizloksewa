import * as FaIcons from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';



export const RewardPoints = (props) => {
    return (
        <>
       
            <div className="row mx-3">
            <Dropdown className="rp_text pt-1">
                <div className="col-md-3 mt-2">
                   
                    <Dropdown.Toggle variant ='secondary' id="">
                    Quiz Points
                    
                <FaIcons.FaAward className="m-auto" /> 
                <small className="d-block px-3">{props.points}</small>
                     </Dropdown.Toggle>
                    
                </div>
                <div className="col-md-9 mx-auto">
                   
                    <Dropdown.Menu>
                        <Dropdown.Item href="/cashout">CashOut</Dropdown.Item>
                        <Dropdown.Divider/>
                        <Dropdown.Item href="/knowmore">Know More</Dropdown.Item>
                        
                        
                    </Dropdown.Menu>
                
               
                
                </div>
                </Dropdown>
            </div>
        </>
    )
}
