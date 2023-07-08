SELECT
  ruc.ruc_id,
  ruc.ruc_nombre,
  ruc.ruc_ci,
  ruc.ruc_dv,
  ruc.ruc_estado,
  ruc.ruc_adicional,
  (
    (
      (
        (
          (
            (
              REPLACE((ruc.ruc_nombre) :: text, ',' :: text, '' :: text) || ' ' :: text
            ) || ruc.ruc_ci
          ) || ' ' :: text
        ) || ruc.ruc_ci
      ) || '-' :: text
    ) || ruc.ruc_dv
  ) AS FULLTEXT
FROM
  ruc;