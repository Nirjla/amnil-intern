export default function SectionWrapper({ children }: { children: React.ReactNode }) {
      return (<>
            <div className='py-5'>{children && children}</div>
      </>)
}