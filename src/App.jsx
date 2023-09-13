import { useState, useMemo } from "react";

function App() {
  const [birthDate, setBirthDate] = useState({ day: '', month: '', year: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBirthDate((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const isDayValid = (inputDay) => inputDay > 0 && inputDay < 32;
  const isMonthValid = (inputMonth) => inputMonth > 0 && inputMonth < 13;

  const isYearValid = (inputYear) => {
    const currentYear = new Date().getFullYear();
    return !isNaN(inputYear) && inputYear <= currentYear && inputYear > 99;
  };

  const validateInput = (name, value) => {
    switch (name) {
      case 'day':
        return isDayValid(value);
      case 'month':
        return isMonthValid(value);
      case 'year':
        return isYearValid(value);
      default:
        return false;
    }
  };

  const inputValidation = useMemo(() => {
    return {
      day: validateInput('day', birthDate.day),
      month: validateInput('month', birthDate.month),
      year: validateInput('year', birthDate.year)
    };
  }, [birthDate]);

  const calculateAge = () => {
    if (inputValidation.day && inputValidation.month && inputValidation.year) {
      const today = new Date();
      const dateOfBirth = new Date(birthDate.year, birthDate.month - 1, birthDate.day);

      let ageYears = today.getFullYear() - dateOfBirth.getFullYear();
      let ageMonths = today.getMonth() - dateOfBirth.getMonth();
      let ageDays = today.getDate() - dateOfBirth.getDate();

      if (ageDays < 0) {
        ageMonths--;
        ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      }

      if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
      }

      return { ageYears, ageMonths, ageDays };
    }
    return { ageYears: '--', ageMonths: '--', ageDays: '--' };
  };

  const age = calculateAge();

  return (
    <>
      <div className="md:h-screen md:flex md:items-center">
        <article className="bg-main-white mt-[7rem] md:mt-0 mx-4 px-6 py-12 rounded-l-2xl rounded-r-2xl rounded-bl-2xl rounded-br-[9rem] md:max-w-2xl md:mx-auto md:px-12">
          <section className="grid grid-cols-3 gap-4 font-extrabold text-xs md:grid-cols-4 md:gap-7">
            <div>
              <label htmlFor="day" 
                className={`
                  ${inputValidation.day ? '' : 'text-warning'} 
                  tracking-[.2em] text-main-smokey-grey`}>DAY</label>
              <input 
                id="day"
                name="day"
                placeholder="DD" 
                className={`
                  ${inputValidation.day ? '' : 'border-warning'}
                  w-full border p-3 rounded-lg text-2xl mt-1 md:text-3xl`}
                value={birthDate.day}
                onChange={handleInputChange}
                type="text" />
              {!inputValidation.day && <p className='text-warning text-[.8rem] italic font-normal mt-2'>Must be a valid day</p>}
            </div>
            <div>
              <label htmlFor="month" className={`
                ${inputValidation.month ? '' : 'text-warning'}
                tracking-[.2em] text-main-smokey-grey`}>MONTH</label>
              <input 
                id="month"
                name="month"
                placeholder="MM" 
                className={`
                  ${inputValidation.month ? '' : 'border-warning'}
                  w-full border p-3 rounded-lg text-2xl mt-1 md:text-3xl`} 
                value={birthDate.month}
                onChange={handleInputChange}
                type="text" />
              {!inputValidation.month && <p className="text-warning text-[.8rem] italic font-normal mt-2">Must be a valid month</p> }
            </div>
            <div>
              <label htmlFor="year" 
                className={`
                  ${inputValidation.year ? '' : 'text-warning'}
                  tracking-[.2em] text-main-smokey-grey`}>YEAR</label>
              <input 
                id="year"
                name="year"
                placeholder="YYYY" 
                className={`
                ${inputValidation.year ? '' : 'border-warning'}
                w-full border p-3 rounded-lg text-2xl mt-1 md:text-3xl`} 
                value={birthDate.year}
                onChange={handleInputChange}
                type="text" />
              {!inputValidation.year && <p className="text-warning text-[.8rem] italic font-normal mt-2">Must be a valid year</p>}
            </div>
          </section>

          <section className="my-16 relative md:my-0">
            <hr className="absolute top-1/2 left-0 right-0" />
            <div className="logo_drew w-16 h-16 bg-main-purple rounded-full relative mx-auto md:mr-0 md:w-20 md:h-20">
              <div className="drawing" />
            </div>
          </section>

          <section className="text-[3.6em] font-main-poppins leading-[1.14] font-extrabold italic md:text-[5.4em]">
            <p><span className="text-main-purple mr-2">{age.ageYears}</span>years</p>
            <p><span className="text-main-purple mr-2">{age.ageMonths}</span>months</p>
            <p><span className="text-main-purple mr-2">{age.ageDays}</span>days</p>
          </section>
        </article>
      </div>
    </>
  );
}

export default App;
