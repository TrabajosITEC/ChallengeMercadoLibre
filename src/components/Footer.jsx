export default function Footer(){
    return(
        <div>
            <footer className="bg-gray-700 border-none	border-noround justify-content-center flex relative">
                    <div className="text-center">
                        <h2 className='text-base text-white pt-2'>Centro de atención al cliente</h2>
                        <p className="text-sm text-white">Lunes a Viernes: 9 a 20 hs || Sábados: 9 a 17 hs</p>        
                        <section className="flex justify-content-center mb-2">
                            <a className='no-underline text-white px-3' href="/" alt="facebook"><i className="text-xl pi pi-facebook"></i></a>
                            <a className='no-underline text-white px-3' href="/" alt="instagram"><i className="text-xl pi pi-instagram"></i></a>
                            <a className='no-underline text-white px-3' href="/" alt="twitter"><i className="text-xl pi pi-twitter"></i></a>
                            <a className='no-underline text-white px-3' href="/" alt="telegram"><i className="text-xl pi pi-telegram"></i></a>
                            <a className='no-underline text-white px-3' href="/" alt="whatsapp"><i className="text-xl pi pi-whatsapp"></i></a>        
                        </section>
                        <p className="mt-1 pb-1 text-xs text-white">|iTec ©| - Todos los derechos reservados</p>
                    </div>
            </footer>
        </div>
    )
}