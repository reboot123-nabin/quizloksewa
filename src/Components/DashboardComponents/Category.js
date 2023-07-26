import React from 'react'
import Header from '../CommonComponents/Header'

const Category = () => {
    return (
        <>
        <Header />
            <div className="myCategory">

                <table id="table">
                    <tr>
                        <td colspan="2">
                            <div className="categoryheader">Choose YOur Categories</div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="div-category">
                                <img src="images/education.jpg" style={{ width: "50%" }} />
                                <p>Information is not knowledge.The only source of
                                    knowledge is experience.Get Involved to achieve

                                </p>
                                <button className="btncategory btncategory1">Education</button>
                                <br /><br />
                            </div>
                        </td>
                        <td>
                            <div className="div-category">
                                <img src="images/music.jpg" style={{ width: "50%" }} />
                                <p>Information is not knowledge.The only source of
                                    knowledge is experience.Get Involved to achieve</p>
                                <button className="btncategory btncategory2">Music</button>
                                <br /><br />
                            </div>
                        </td>
                        <td>
                            <div className="div-category">
                                <img src="images/enginer.jpg" style={{ width: "50%" }} />
                                <p>Information is not knowledge.The only source of
                                    knowledge is experience.Get Involved to achieve</p>
                                <button className="btncategory btncategory3">Science</button>
                                <br /><br />
                            </div>
                        </td>
                        <td>
                            <div className="div-category">
                                <img src="images/history.jpg" style={{ width: "50%" }} />
                                <p>Information is not knowledge.The only source of
                                    knowledge is experience.Get Involved to achieve</p>
                                <button className="btncategory btncategory4">History</button>
                                <br /><br />
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <div className="div-category">
                                <img src="images/math.jpg" style={{ width: "50%" }} />
                                <p>Information is not knowledge.The only source of
                                    knowledge is experience.Get Involved to achieve.</p>
                                <button className="btncategory btncategory1">Mathematics</button>
                                <br /><br />
                            </div>
                        </td>
                        <td>
                            <div className="div-category">
                                <img src="images/sewa.jpg" style={{ width: "50%" }} />
                                <p>Information is not knowledge.The only source of
                                    knowledge is experience.Get Involved to achieve</p>
                                <button className="btncategory btncategory2">Lok Sewa</button>
                                <br /><br />
                            </div>
                        </td>
                        <td>
                            <div className="div-category">
                                <img src="images/iom.jpg" style={{ width: "50%" }} />
                                <p>Information is not knowledge.The only source of
                                    knowledge is experience.Get Involved to achieve</p>
                                <button className="btncategory btncategory3">IOM</button>
                                <br /><br />
                            </div>
                        </td>
                        <td>
                            <div className="div-category">
                                <img src="images/ioe.jpg" style={{ width: "50%" }} />
                                <p>Information is not knowledge.The only source of
                                    knowledge is experience.Get Involved to achieve</p>
                                <button className="btncategory btncategory4">IOE</button>
                                <br /><br />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">&nbsp;</td>
                    </tr>
                </table>

            </div>
            )
        </>
}

export default Category
