/**
 * CustomResponseField - ResponseField wrapper that hides the bottom divider
 *
 * Usage:
 *   <CustomResponseField name="field_name" type="string">
 *     Description text
 *   </CustomResponseField>
 *
 * Props:
 *   - All ResponseField props are supported (name, type, default, required, post, etc.)
 */
export const CustomResponseField = ({ children, ...props }) => {
  const uniqueId = `custom-rf-${Math.random().toString(36).substring(2, 11)}`;

  return (
    <div className={uniqueId}>
      <style>{`
        .${uniqueId} > .field {
          border-bottom: none !important;
          margin-bottom: -20px !important;
        }
      `}</style>
      <ResponseField {...props}>{children}</ResponseField>
    </div>
  );
};
