import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
  try {
    const supabase = locals.supabase;
    const { projectName, selectedOutline, colors, typographyStyles } = await request.json();
    
    // Create brand guideline record
    const { data: brandData, error: brandError } = await supabase
      .from('brand_guidelines')
      .insert({
        user_id: locals.session?.user.id,
        brand_name: projectName,
        outline_type: selectedOutline,
        created_at: new Date().toISOString()
      })
      .select('id')
      .single();
    
    if (brandError) {
      console.error('Error creating brand guideline:', brandError);
      return json({ success: false, error: brandError.message }, { status: 500 });
    }
    
    const brandId = brandData.id;
    
    // Insert colors
    for (const color of colors) {
      // First check if color exists
      let colorId;
      const { data: existingColor } = await supabase
        .from('colors')
        .select('id')
        .eq('hex', color.hex)
        .maybeSingle();
      
      if (existingColor) {
        colorId = existingColor.id;
      } else {
        // Parse hex to RGB
        const hex = color.hex.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        
        // Insert new color
        const { data: newColor, error: colorError } = await supabase
          .from('colors')
          .insert({
            name: color.name,
            hex: color.hex,
            red: r,
            green: g,
            blue: b
          })
          .select('id')
          .single();
        
        if (colorError) {
          console.error('Error creating color:', colorError);
          continue;
        }
        
        colorId = newColor.id;
      }
      
      // Link color to brand
      await supabase
        .from('brand_colors')
        .insert({
          brand_id: brandId,
          color_id: colorId,
          is_primary: color.isPrimary
        });
    }
    
    // Insert typography styles
    for (const style of typographyStyles) {
      await supabase
        .from('brand_typography')
        .insert({
          brand_id: brandId,
          style_name: style.name,
          font_size: style.size,
          font_weight: style.weight,
          line_height: style.lineHeight
        });
    }
    
    return json({ success: true, brandId });
  } catch (error) {
    console.error('Error in setup API:', error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}
