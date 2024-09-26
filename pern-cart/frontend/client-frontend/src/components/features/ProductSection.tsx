import ProductCard from "../common/ProductCard";
import GridWrapper from "../wrapper/GridWrapper";
import SectionWrapper from "../wrapper/SectionWrapper";

export default function ProductSection() {
      return (<>
            <SectionWrapper>
                  <GridWrapper>
                        <ProductCard />
                  </GridWrapper>
            </SectionWrapper>
      </>)
}