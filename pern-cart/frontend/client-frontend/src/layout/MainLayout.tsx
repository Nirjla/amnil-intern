import Header from "../components/features/Header";
import ContainerWrapper from "../components/wrapper/ContainerWrapper";

export default function MainLayout({ children }: { children: React.ReactNode }) {
      return (<>
            <Header />
            <ContainerWrapper>
                  {children}
            </ContainerWrapper>
      </>)
}