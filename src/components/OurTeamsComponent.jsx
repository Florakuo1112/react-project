function OurTeamComponent({link, title, introduction}){
    return(<>
            <div className="card bg-transparent border-0" >
                <img src={link} alt={title} style={{'maxWidth':'100%'}}/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{introduction}</p>
            </div>
        </div>
        </>
    )
};

export default OurTeamComponent;