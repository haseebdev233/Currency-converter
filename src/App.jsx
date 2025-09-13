import { useState } from 'react'
import InputBox from './components/InputBox.jsx'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import './App.css'
import bgPicture from './assets/bg-picture.jpg'

function App() {
  const [amount, setAmount] = useState()
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState()

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }
  
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }
  const clearInputBox = () => {
    setAmount("")
    setConvertedAmount("")
  }

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${bgPicture})`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert()
            }}
          >
            {/* FROM */}
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
                className='hover:border-2'
              />
            </div>

            {/* SWAP BUTTON */}
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute hover:bg-blue-400 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>

            {/* TO */}
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}   
                className='hover:border-2'
                amountDisable
              />
            </div>

            {/* SUBMIT */}
            <div className='flex'>            
              <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-400">
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
            <button className='bg-black text-white p-2 rounded-xl mx-2 hover:bg-black/60' onClick={clearInputBox}>clear</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) 
}

export default App
