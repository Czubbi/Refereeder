<form>
    <div name="rules">
        <label for="ruleNumber">Rule Number:</label>
        <input type="text" class="form-control" name="ruleNumber">
        <div name="lang">
            <select>
                <option value="eng">English</option>
                <option value="esp">Spanish</option>
            </select>
        </div>
    </div>

    <div>
        <label for="ruleName">Rule Name:</label>
        <input type="text" class="form-control" name="ruleName">
        <label for="ruleTitle">Rule Title:</label>
        <input type="text" class="form-control" name="ruleTitle">
        <label for="ruleText">Rule Text:</label>
        <input type="text" class="form-control" name="ruleText">
    </div>

    <div name="subRules">
        <label for="subRuleNumber">SubRule Number:</label>
        <input type="text" class="form-control" name="subRuleNumber">
        <label for="subRuleName">SubRule Name:</label>
        <input type="text" class="form-control" name="subRuleName">
        <label for="subRuleTitle">SubRule Title:</label>
        <input type="text" class="form-control" name="subRuleTitle">

        <div name="paragraphs">
            <label for="paragraphNumber">Paragraph Number:</label>
            <input type="text" class="form-control" name="paragraphNumber">
            <label for="paragraphTitle">Paragraph Title:</label>
            <input type="text" class="form-control" name="paragraphTitle">
            <label for="paragraphText">Paragraph Text:</label>
            <input type="text" class="form-control" name="paragraphText">

            <div name="alphaRules" >
                <label for="alphaRuleNumber">Alpha Rule Number:</label>
                <input type="text" class="form-control" name="alphaRuleNumber">
                <label for="alphaRuleText">Alpha Rule Text:</label>
                <input type="text" class="form-control" name="alphaRuleText">

                <div name="dashRules">
                    <label for="dashRuleNumber">Dash Rule Number:</label>
                    <input type="text" class="form-control" name="dashRuleNumber">
                    <label for="dashRuleText">Dash Rule Text:</label>
                    <input type="text" class="form-control" name="dashRuleText">
                </div>

                <div name="numRules">
                    <label for="numRuleNumber">Num Rule Number:</label>
                    <input type="text" class="form-control" name="numRuleNumber">
                    <label for="numRuleText">Num Rule Text:</label>
                    <input type="text" class="form-control" name="numRuleText">
                </div>
            </div>

            <div name="dashRules">
                <label for="dashRuleNumber">Dash Rule Number:</label>
                <input type="text" class="form-control" name="dashRuleNumber">
                <label for="dashRuleText">Dash Rule Text:</label>
                <input type="text" class="form-control" name="dashRuleText">
            </div>
        </div>
    </div>
    <input value= "Save" type="submit" class="btn btn-primary">
</form>