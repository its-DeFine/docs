/**
 * AccordionGroupList — renders N empty Accordion items.
 *
 * Usage in MDX:
 *   <AccordionGroupList num={3} />
 */
export const AccordionGroupList = ({ num = 1 }) => (
  <AccordionGroup>
    {Array.from({ length: num }, (_, i) => (
      <Accordion key={i} title={`Section ${i + 1}`}></Accordion>
    ))}
  </AccordionGroup>
)

export default AccordionGroupList
