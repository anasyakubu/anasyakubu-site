// import React from 'react'
import ContactFAQ from "../../components/contact/ContactFAQ"
import ContactForm from "../../components/contact/ContactForm"
import ContactHero from "../../components/contact/ContactHero"


const Contact = () => {
  return (
    <div className='font-bold'>
      <ContactHero />
      <ContactForm />
      <ContactFAQ />
    </div>
  )
}

export default Contact