import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Terms = () => {
	return (
		<main className="min-h-screen bg-navy">
			<Navbar />
			<div className="container mx-auto px-4 py-24 max-w-4xl">
				<h1 className="text-4xl font-bold mb-8 text-white">Términos y Condiciones</h1>

				<div className="space-y-6 text-light-gray">
					<section>
						<h2 className="text-2xl font-semibold mb-4 text-bright-blue">1. Descripción General del Concurso</h2>
						<p>Este concurso de trading se organiza para poner a prueba y exhibir habilidades de trading en un entorno competitivo. Los participantes deben tener la edad legal en su jurisdicción para participar.</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-bright-blue">2. Elegibilidad</h2>
						<ul className="list-disc pl-6 space-y-2">
							<li>Los participantes deben tener al menos 18 años</li>
							<li>Deben contar con una dirección de correo electrónico válida</li>
							<li>Deben completar el proceso de registro y pagar la tarifa de inscripción</li>
							<li>Deben cumplir con todas las leyes y regulaciones locales</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-bright-blue">3. Reglas del Concurso</h2>
						<ul className="list-disc pl-6 space-y-2">
							<li>El trading debe realizarse dentro del período de concurso especificado</li>
							<li>Solo se permiten los pares de trading designados</li>
							<li>Está prohibido el uso de sistemas de trading automatizados o bots</li>
							<li>Las tácticas de manipulación de mercado están estrictamente prohibidas</li>
							<li>Los participantes deben usar su propia cuenta de trading</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-bright-blue">4. Distribución de Premios</h2>
						<p>Los premios se distribuirán según las clasificaciones finales. El organizador se reserva el derecho de verificar todas las actividades de trading antes de distribuir los premios.</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-bright-blue">5. Descalificación</h2>
						<p>El organizador se reserva el derecho de descalificar a cualquier participante que:</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>Infrinja las reglas del concurso</li>
							<li>Proporcione información falsa</li>
							<li>Participe en prácticas de trading desleales</li>
							<li>Intente manipular los resultados del concurso</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-bright-blue">6. Responsabilidad</h2>
						<p>Los participantes reconocen que el trading implica riesgo y el organizador no se hace responsable de ninguna pérdida incurrida durante el concurso.</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4 text-bright-blue">7. Cambios en los Términos</h2>
						<p>El organizador se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Se notificará a los participantes sobre cualquier cambio.</p>
					</section>
				</div>
			</div>
			<Footer />
		</main>
	);
};

export default Terms;
