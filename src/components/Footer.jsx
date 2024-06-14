export default function Footer(){
    return(
        <div>
            <footer class="card bg-bluegray-100 border-circle-top">
                    <div class="card-body text-center">
                        <h2 class='pt-3'>Centro de atención al cliente</h2>
                        <p class="text-900 pb-1">Lunes a Viernes: 9 a 20 hs || Sábados: 9 a 17 hs</p>        
                        <section className="flex justify-content-center mt-3 mb-3">
                            <a class='no-underline text-900 px-4' href="/" alt="facebook"><i className="text-2xl pi pi-facebook"></i></a>
                            <a class='no-underline text-900 px-4' href="/" alt="instagram"><i className="text-2xl pi pi-instagram"></i></a>
                            <a class='no-underline text-900 px-4' href="/" alt="twitter"><i className="text-2xl pi pi-twitter"></i></a>
                            <a class='no-underline text-900 px-4' href="/" alt="telegram"><i className="text-2xl pi pi-telegram"></i></a>
                            <a class='no-underline text-900 px-4' href="/" alt="whatsapp"><i className="text-2xl pi pi-whatsapp"></i></a>        
                        </section>
                        <code>|iTec ©| - Todos los derechos reservados</code>
                    </div>
            </footer>
        </div>
    )
}