const Loader = () => {
  return (
    <div className="container z-50">
      {Array.from({ length: 5 }, (_, index) => <Dot key={index} />)}
    </div>
  )
}

export default Loader;

const Dot = () => {
  return (
    <div className="dot dark:bg-white bg-[#649fff]"></div>
  )
}