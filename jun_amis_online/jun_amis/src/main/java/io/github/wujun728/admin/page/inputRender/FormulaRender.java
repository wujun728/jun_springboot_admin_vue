package io.github.wujun728.admin.page.inputRender;

import io.github.wujun728.admin.page.data.InputField;

import java.util.Map;

public class FormulaRender extends InputDefaultRender{
    @Override
    protected void extra(Map<String, Object> config, InputField field) {
        config.put("formula",field.getFormat());
    }
}
