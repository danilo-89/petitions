import React from 'react';
import './PetitionSingle.css'

const PetitionSingle = (props) => {
    return (
        <>
            <div className="petition-header">

                <div
                    className="cover-holder"
                >

                    <div className="cover-holder__title">

                        
                        <h2 className="cover-holder__title-name">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste error commodi delectus vitae ducimus praesentium, impedit reiciendis soluta.
                        </h2>

                    </div>

                    <div
                        className="cover-holder__cover"
                        style={
                            { backgroundImage: `url(${props.imageCover})` }
                        }
                    >
                        <div className="cover-holder__top"></div>
                        <button className="sign-petition-button">Sign</button>
                    </div>
                    <div className="title-holder">
                        <div className="title-holder__left">
                            <div
                                className="title-holder__left-avatar"
                                style={
                                    { backgroundImage: `url(${props.imageCover})` }
                                }
                            ></div>
                        </div>
                        <div className="title-holder__right">
                            <p>Petition author:</p>
                            <h3>Lorem ipsum dolor sit amet consec</h3>
                        </div>
                    </div>
                    {/* <div className="actions-holder">
                        <button>Sign</button>
                    </div> */}
                </div>
            </div>

            <div className="petition-content">
            <div className="towards-holder">
                            <h3>
                                <span className="towards-holder__for-span">For:</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, ratione sed.</h3>
                        </div>
                <h4 className="petition-content__overview">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum voluptatibus explicabo fugit autem iusto aliquid, porro mollitia quam nam odio repellat dignissimos, vel perferendis. Explicabo a numquam aliquam, illum in voluptas porro accusamus debitis repudiandae, eos provident est accusantium sunt, asperiores atque dolore tempora maiores laudantium consequuntur et officia. Distinctio impedit architecto, porro molestias voluptatibus, aut tenetur magni sequi libero earum officiis eos blanditiis, velit odio sit numquam quia veniam.
                </h4>
                <p className="petition-content__details">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem blanditiis autem error amet quaerat eos facilis vero rerum, enim ipsam, nemo iure. Consequatur doloribus voluptatibus, eveniet quae eaque, ut eligendi, officiis vel aliquid cumque necessitatibus aliquam excepturi? Consectetur reiciendis voluptas labore accusantium nesciunt excepturi maxime dolorum pariatur iure magnam deleniti odit, voluptatem doloribus nobis architecto, aspernatur asperiores ipsam id iste fuga quisquam. Expedita officiis voluptates odit ex voluptas, velit sapiente blanditiis, quis incidunt, dolorem laboriosam illo non obcaecati dolores cum excepturi laborum. Esse nulla dolorem qui voluptatem culpa ex amet molestias voluptas libero repellat. Tenetur cupiditate autem alias, suscipit incidunt reiciendis odit odio ea. Culpa asperiores obcaecati ad voluptatem dolores cum dolor perferendis ab eius, cumque voluptas doloribus. Maiores neque dicta quibusdam dolore natus, modi perferendis. Aliquam similique officiis neque fuga commodi doloremque aperiam in nemo beatae repudiandae, dolorum voluptatum. In iure esse eligendi nihil aut laborum dolore reiciendis ducimus.
                </p>
            </div>

            {/* <img src={props.imageCover} alt="" /> */}
            <h2>{props.title}</h2>
            <h3>For: {props.towards}</h3>
            <p>{props.overview}</p>
            <p>{props.details}</p>
        </>
    );
}

export default PetitionSingle;