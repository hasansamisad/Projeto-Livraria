import PropTypes from "prop-types";

export function TabelaDados({ columns, data, onEdit, onDelete, emptyMessage }) {
  
  // Se não houver dados cadastrados, exibe uma mensagem amigável no centro
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <span className="text-4xl mb-3">📭</span>
        <p className="text-slate-400 text-sm font-medium">
          {emptyMessage || "Nenhum registo encontrado."}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-800/60 bg-slate-900/50">
      <table className="w-full border-collapse text-left text-sm text-slate-300">
        
        {/*  CABEÇALHO DA TABELA */}
        <thead className="bg-slate-800/40 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800">
          <tr>
            {columns.map((col, index) => (
              <th key={col.key || index} className="px-6 py-4 font-semibold">
                {col.label}
              </th>
            ))}
            {/* Coluna reservada para os botões de Editar e Excluir */}
            {(onEdit || onDelete) && (
              <th className="px-6 py-4 text-right font-semibold w-32">
                Ações
              </th>
            )}
          </tr>
        </thead>

        {/*  CORPO DA TABELA (LINHAS DINÂMICAS) */}
        <tbody className="divide-y divide-slate-800/60 bg-slate-850/20">
          {data.map((item, rowIndex) => (
            <tr 
              key={item.id || rowIndex} 
              className="hover:bg-slate-800/30 transition-colors duration-150 group"
            >
              {columns.map((col, colIndex) => (
                <td key={col.key || colIndex} className="px-6 py-4 whitespace-nowrap font-medium text-slate-200">
                  {/* Se a coluna tiver uma função 'render' customizada (ex: formatar data), usa-a. 
                      Caso contrário, exibe o texto puro da chave. */}
                  {col.render ? col.render(item) : item[col.key]}
                </td>
              ))}

              {/* COLUNA DE ACÇÕES (BOTÕES) */}
              {(onEdit || onDelete) && (
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    
                    {/* Botão Editar */}
                    {onEdit && (
                      <button
                        onClick={() => onEdit(item)}
                        className="inline-flex items-center justify-center p-2 rounded-lg text-amber-400 hover:bg-amber-500/10 hover:text-amber-300 transition-colors cursor-pointer"
                        title="Editar registo"
                      >
                        ✏️
                      </button>
                    )}

                    {/* Botão Deletar */}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(item.id)}
                        className="inline-flex items-center justify-center p-2 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer"
                        title="Excluir registo"
                      >
                        🗑️
                      </button>
                    )}

                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

//  VALIDAÇÃO DE PROPS (Boa prática indispensável para evitar bugs)
TabelaDados.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      render: PropTypes.func, // Opcional, para formatações complexas
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  emptyMessage: PropTypes.string,
};