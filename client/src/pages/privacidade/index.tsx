import { useEffect } from "react";
export default function Privacidade() {
  useEffect(() => {
    document.title = "Política de Privacidade - Busca Frete";
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">

      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-extrabold text-center text-gray-900">Política de Privacidade</h1>
          <p className="mt-6 text-lg text-gray-600">
            Esta Política de Privacidade descreve como o aplicativo Busca Frete coleta, usa e compartilha informações pessoais dos usuários.
          </p>
          <h2 className="mt-8 text-xl font-bold text-gray-900">Coleta de Informações:</h2>
          <p className="mt-2 text-lg text-gray-600">
            O Busca Frete coleta informações de localização dos usuários para facilitar a solicitação e rastreamento de frete. Os motoristas também compartilham sua localização para otimizar as rotas de entrega.
          </p>
          <h2 className="mt-8 text-xl font-bold text-gray-900">Uso de Informações:</h2>
          <p className="mt-2 text-lg text-gray-600">
            As informações de localização são utilizadas para fornecer serviços de solicitação e rastreamento de frete. Os dados são usados para melhorar a eficiência das entregas e a experiência do usuário.
          </p>
          <h2 className="mt-8 text-xl font-bold text-gray-900">Compartilhamento de Informações:</h2>
          <p className="mt-2 text-lg text-gray-600">
            As informações de localização podem ser compartilhadas com motoristas para facilitar a entrega. Não compartilhamos informações pessoais com terceiros sem consentimento do usuário, exceto quando necessário para fornecer os serviços solicitados.
          </p>
          <h2 className="mt-8 text-xl font-bold text-gray-900">Segurança de Dados:</h2>
          <p className="mt-2 text-lg text-gray-600">
            Tomamos medidas para proteger as informações pessoais dos usuários contra acesso não autorizado ou uso indevido.
          </p>
          <h2 className="mt-8 text-xl font-bold text-gray-900">Alterações na Política de Privacidade:</h2>
          <p className="mt-2 text-lg text-gray-600">
            O Busca Frete pode atualizar esta Política de Privacidade periodicamente. Recomendamos que os usuários revisem esta política regularmente para estar cientes de quaisquer alterações.
          </p>
          <p className="mt-4 text-lg text-gray-600">
            Ao usar o aplicativo Busca Frete, você concorda com a coleta e uso de suas informações pessoais conforme descrito nesta Política de Privacidade.
          </p>
          <p className="mt-2 text-lg text-gray-600">
            Última atualização: 05/05/2024
          </p>
        </div>
      </main>
    </div>
  );
}