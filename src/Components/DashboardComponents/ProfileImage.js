import React from 'react'

const ProfileImage = (props) => {
    return (
        <div>
            <div className="row mb-3">
                <div className="col-sm-3">
                    <div className="d-flex flex-column align-items-center text-center">
                        <label htmlFor="upload_image">
                            <img src={props.id ? "http://localhost:9000/file/" + props.id : 'logo.png'}
                                alt="User Profile Pic"
                                class="rounded-circle p-1 bg-primary upload-image"
                                width="80"
                                height="80"
                            />
                        </label>
                        <input type="file" hidden="true" id="upload_image" />
                    </div>

                </div>
                <div className="col-sm-9 text-secondary">
                    <div className="mt-3">
                        <h5>{props.first_name2} {props.last_name2}</h5>
                        Email:<p>{props.email2}</p>

                        Phone:<p>{props.phone2}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileImage
