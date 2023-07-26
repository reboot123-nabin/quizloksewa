import React from 'react';
import { Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Header from './Header';


const Knowmore = () => {
    return (
        
        <>
       <Header/>
        <div className="Knowmore">
            <h1 className="text-center">Reward Points</h1>
            <hr className="w-50 mx-auto "/>
            </div>
            <div className="container rewardinfo">
                <h5 className="text-center">Content[Hide contents]</h5>
                <hr className="w-50 mx-auto"/>
            <div className="row">
                <div className="col-md-12">
                <p className="text-center">0.1 Reward point is the extra value given to Yess quiz users 
                    for using numerous yess quiz services. 
                    The more you use Yess Quiz services, the more points you can collect in your account.
                     These points can be redeemed for gifts, made available by Yess quiz.</p>

                     <p className="text-center">0.2 For Example:
                     If you have collected 50000 reward points in your yess quiz wallet, 
                     you are entitled to an Android Smartphone or an 18″ TV set.</p>

                     <p className="text-center">0.3 To redeem your reward points, please email us at dipsapkota325@gmail.com
                      clearly stating how many reward points you want to redeem as well as provide us your yess quiz id</p>

                      <p className="text-center">0.3.1 You have the option to either redeem the reward points 
                      you have collected or can keep accumulating the points to receive a higher valued gift voucher.</p>

                      <p className="text-center">0.4 If you have any queries, feel free to contact us at our Toll-Free Number: <NavLink to="" style={{color:'blue'}}>1660-01-02121.</NavLink>  
                      Facebook Page or Viber us at<NavLink to="" style={{color:'blue'}}>+977 1234512345.</NavLink> </p>

                      <p className="frequent" style={{fontWeight:'bold'}}>FREQUENTLY ASK QUESTION</p>

                      <p className="text-center">1.0.1 1. How can I increase my reward points? Your reward point increases as you go on playing the quiz through yess quiz. 
                      The more play, the more reward point you get.</p>


                </div>
                
            </div>
            </div><br/>

            <div className="container basicinfo ">
                <div className="row">
                    <div className="col-md-12">
                    <h5>Reward point is the extra value given to Yess quiz users for using numerous Yess quiz services. 
                    The more you use Yess quiz services, the more points you can collect in your account.
                     These points can be redeemed for gifts, made available by Yess quiz.</h5>

                     <p>For the reward points collected in your Yess quiz account, 
                         you will be able to redeem your reward points with the following gift vouchers.</p>
                    </div>
                </div>
               
            </div>

            <div className="container tablequiz">
                <div className="row">
                    <div className="col-md-12">
                    <Table striped bordered hover>
                            <thead>
                                <tr>
                               
                                <th>Reward Points</th>
                                <th>Gift Voucher</th>
                               
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                              
                                <td>1000</td>
                                <td>5 Yess quiz question</td>
                               
                                </tr>
                                <tr>
                               
                                <td>2000</td>
                                <td>Buy yess quiz question</td>
                             
                                </tr>

                                <tr>
                               
                               <td>2000</td>
                               <td>Buy yess quiz question</td>
                            
                               </tr>

                               <tr>
                               
                               <td>2000</td>
                               <td>Buy yess quiz question</td>
                            
                               </tr>

                               <tr>
                               
                               <td>2000</td>
                               <td>Buy yess quiz question</td>
                            
                               </tr>

                               <tr>
                               
                               <td>2000</td>
                               <td>Buy yess quiz question</td>
                            
                               </tr>
                             
                            </tbody>
                            </Table>

                            <h4>For Example</h4>
                            <p>If you have collected 50000 reward points in your Yess quiz wallet,
                                 you are entitled to an Android Smartphone or an 18″ TV set.</p>

                                 <h5>To redeem your reward points, please email us at <NavLink to="" style={{color:'red'}}>dipsapkota325@gmail.com</NavLink> clearly
                                      stating how many reward points you want to redeem as well as provide us your Yess quiz id.</h5>
                                    
                                 <p>You have the option to either redeem the reward points you have collected or can keep accumulating the
                                         points to receive a higher valued gift voucher.</p>

                                <p>For example: If you have 1100 reward points and you claim 1000 reward points then there will only be 100 reward points available in your eSewa id.</p>

                                <p>And again it will increase as you go on doing the transaction.</p>

                                <p>Once you redeem your reward points and choose the gift vouchers, it is non-refundable and you will have to collect your gifts within a month from the time we contact you. When you come to collect your gift, you are required to 
                                    bring photo identification along with yourself (License, Passport, Citizenship or Voter’s ID card).</p>

                                    <h5>If you have any queries, 
                                    feel free to contact us at our Toll-Free Number:  <NavLink to="" style={{color:'blue'}}>+977 1234512345.</NavLink> Facebook Page or Viber us at <NavLink to="" style={{color:'blue'}}>+977 1234512345.</NavLink></h5>
                    </div>
                </div>
            </div>

            <div className="container askquestion">
                <div className="row">
                    <div className="col-md-12">
                        <h3>FREQUENTLY ASKED QUESTIONS</h3>
                        <hr className="w-50"/>

                        <h3>1. How can I increase my reward points?</h3>
                        <p>Your reward point increases as you go on playing daily quiz through yess quiz. 
                            The more play, the more reward point you get.</p>

                            <h3>2. Can I transfer my reward points to another Yess quiz user?</h3>
                        <p>No, the reward points are non-transferable and can only be redeemed by you from your account.</p>

                        <h3>3. Where do I come to collect the gift?</h3>
                        <p>You are required to come to our head office at Hattisar to collect your gift.
                            Full Address: Lanchan Plaza, 8th Floor Hattisar, Kathmandu, Nepal
                            Toll-Free No: 1660-01-02121
                            Tel: 01-5970121</p>

                            <h3>5. How can I check my reward points balance?</h3>
                        <p>Log on to your eSewa account and click on your top right corner
                             (Profile Logo), you can find your reward points there.</p>

                             <h3>6.Can I get reward points on every play of Yess quiz?</h3>
                        <p>No, there are certain services in which the reward point is not available.</p>
                    </div>

                </div>
            </div>


       
            
        </>
    )
}

export default Knowmore
