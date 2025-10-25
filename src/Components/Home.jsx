import React from 'react'
import { Link } from 'react-router-dom'
function Home() {
  return (
    <>
    <section style={{minHeight:"100vh",overflowX:"hidden",height:"100%", backgroundImage:"url('https://www.vidyalayaschoolsoftware.com/webassets/images/call_action.svg')",backgroundSize:"cover",backgroundAttachment:"fixed"}}>
        <div className='row pt-5'>
        <div className='col-12 col-md-4'></div>
        <div className='col-12 col-md-4 border py-5 rounded my-5 text-center'>
            <h4 style={{color:"black",fontSize:"40px",fontWeight:"bold"}}>Empowering education through smart management.</h4>
            
            <Link to={"/logins"}>
            <button className='btn btn-primary'>Get Started</button>
            </Link>
             
        </div>
        <div className='col-12 col-md-4'></div>
        </div>
    </section>
    
    
    </>
  )
}

export default Home