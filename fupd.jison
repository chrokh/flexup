/* description: Trying to parse fupd files. */
/* run at:      http://zaach.github.io/jison/try/       */

/* lexical grammar */
%lex
%%

\s+                /* skip whitespace */
":"                return 'EQUALS'
"%"                return 'CAPTURE'
[A-Za-z]+          return 'TEXT'
[A-Za-z0-9*\/\\]+  return 'PATTERN'
<<EOF>>            return 'EOF'

/lex


%start file

%% /* language grammar */



file
    : statements EOF
        %{ 
            var ast, lex, bnf;

            ast = $1;
            lex = lexify(ast);
            bnf = bnfify(lex);

            function lexify(ast){
                var lex = [];

                ast.forEach(function(pattern){
                    pattern.tokens.forEach(function(tok){
                        var type = tok.type + '-' + pattern.name.toUpperCase();
                        lex.push([tok.token, type]);
                    });
                });

                return lex;
            }

            function bnfify(lex){
                var bnf = [];
                
                lex.forEach(function(tok){
                    var type = tok[1].substring(0, tok[1].indexOf('-'));

                    if(type == 'OPEN' || type == 'CLOSE'){
                        var prod, open, close, produced;

                        prod = {};

                        prod.elem = [
                            'open statements close { \$\$ = $1 + "," + $2 + "," + $3; }',
                            'open close { \$\$ = $1 + "," + $2; }'
                        ];
                        bnf.push(prod);
                    }
                });

                return bnf;
            }

            var ret = {
                ast: ast,
                lex: lex,
                bnf: bnf
            };

            console.log(JSON.stringify(ret, null, 4));
            return ast;
        }%
    ;

statements
    : expr            { $$ = [$1]; }
    | expr statements %{
        var head = $1,
            tail = $2,
            res  = [head];

        // add tail
        for(var i=0; i<$2.length; i++){
            res.push($2[i]);


            // check if token already used
            var existing = $2[i].tokens;
            for(var ii=0; ii<existing.length; ii++){

                var fresh = $1.tokens;
                for(var iii=0; iii<fresh.length; iii++){
                    if(existing[ii].token == fresh[iii].token)
                        throw ("Parse error: Ambiguous use of '" + existing[ii].token) + "'";
                }
            }
        }

        $$ = res;
        }%
    ;

expr
    : TEXT EQUALS pattern
        { $$ = { name: $1, tokens: $3}; }
    ;

pattern
    : PATTERN CAPTURE PATTERN
        %{
            if(String($1) == String($3))
                $$ = [{token: String($1), type: 'TAG'}];
            else
                $$ = [
                        {token: String($1), type: 'OPEN'},
                        {token: String($3), type: 'CLOSE'}
                     ];
        }%
    ;



