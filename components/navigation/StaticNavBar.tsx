import Link from "next/link"

const StaticNavBar = (props: {data : {name: string, link: string}[], isShow: boolean, active: string}) => {
  return (
    <div 
      className={`fixed top-6 right-1/2 translate-x-1/2 z-10 py-2.5 px-1 rounded-3xl ring-1 ring-slate-800 backdrop-blur-sm transition-opacity duration-500 font-mono font-bold
        ${props.isShow ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} 
    >
      <ul className="flex gap-2">
        {props.data.map((item, index) => (
          <li key={index}>
            <a
              href={`#${item.link}`}	
              className="rounded-3xl bg-slate-800 px-5 py-2"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StaticNavBar