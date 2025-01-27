import { Link } from 'react-router-dom';

const FooterBottom = () => {
	const currentYear = new Date().getFullYear();

	return (
		<div className="border-t border-gray-700 pt-8">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="text-sm text-gray-400">© {currentYear} Todos los derechos reservados.</div>
				<div className="flex gap-4 text-sm text-gray-400 md:justify-end">
					<Link to="/terms" className="hover:text-white">
						Términos y Condiciones
					</Link>
					<Link to="/terms" className="hover:text-white">
						Política de Privacidad
					</Link>
				</div>
			</div>

			<div className="mt-8 text-xs text-gray-500 space-y-4">
				<p>For Traders es una compañía de educación y evaluación que no recibe depósitos de los clientes ni ofrece servicios financieros a los mismos. Todas las cuentas proporcionadas a los clientes se encuentran en un entorno virtual con dinero virtual.</p>
				<p>Toda la información proporcionada en este sitio web es únicamente con fines educativos en el área de negociación de los mercados financieros y no constituye de ninguna manera recomendaciones de inversión específicas, recomendaciones de negociación, análisis de oportunidades de inversión ni recomendaciones generales similares sobre la negociación de instrumentos de inversión. La Compañía no ofrece servicios de inversión en el sentido de MiFID I. La Compañía no es un proveedor de servicios de inversión con licencia (corredor de valores) en el sentido de MiFID II. Todas las operaciones en la plataforma, puestas a disposición como parte de los servicios que ofrece la Compañía, aunque puedan basarse en datos de negociación reales y simulen negociación real, constituyen únicamente operaciones ficticias en una cuenta de demostración. En este sentido, al tratarse de operaciones ficticias en cuentas ficticias, términos como “trading” o “trader” deben entenderse como tales y no deben interpretarse en el sentido que tienen en el contexto de la negociación real.</p>
				<p>La solución técnica ofrecida en forma de plataformas, puestas a disposición como parte de los servicios ofrecidos por la Compañía (es decir, plataformas para operaciones ficticias en cuentas demo), utiliza servicios de terceros. El sitio web es administrado y propiedad de la Compañía, y todo el contenido está protegido por los derechos de autor de la Compañía.</p>
				<p>Países restringidos: Pakistán, Irán, Siria, Myanmar, Bangladesh, Vietnam, Corea del Norte, la Federación Rusa, la República de Bielorrusia, Cuba, Líbano, Libia, Sudán, Crimea, las regiones de Donetsk y Luhansk de Ucrania, Emiratos Árabes Unidos.</p>
			</div>
		</div>
	);
};

export default FooterBottom;
