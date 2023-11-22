const Footer = () => {
  return (
    <>
      {/* <!-- footer start --> */}
      <footer className="py-2">
        <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between mb-0">
          <p className="block antialiased font-sans text-sm leading-normal font-normal text-inherit">
            © 2023, made by {" Harendra Kumar "}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
              className="-mt-0.5 inline-block h-3.5 w-3.5">
              <path
                d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>{" "}
            by{" "}
            <a href="https://www.creative-tim.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-blue-500">
              GTTech
            </a>{" "}
            IT Team{" "}
          </p>
          <ul className="flex items-center gap-4">
            <li>
              <a href="https://www.creative-tim.com" target="_blank" rel="noreferrer"
                className="block antialiased font-sans text-sm leading-normal py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500">
                Contact Us
              </a>
            </li>
            <li>
              <a href="https://www.creative-tim.com/presentation" target="_blank" rel="noreferrer"
                className="block antialiased font-sans text-sm leading-normal py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500">
                About Us
              </a>
            </li>
            <li>
              <a href="https://www.creative-tim.com/blog" target="_blank" rel="noreferrer"
                className="block antialiased font-sans text-sm leading-normal py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500">
                Blog's
              </a>
            </li>
            <li>
              <a href="https://www.creative-tim.com/license" target="_blank" rel="noreferrer"
                className="block antialiased font-sans text-sm leading-normal py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500">
                License
              </a>
            </li>
          </ul>
        </div>
      </footer>
      {/* <!-- footer end --> */}
    </>
  )
}

export default Footer